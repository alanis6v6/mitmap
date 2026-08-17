/**
 * 下載「MIT 微笑標章通過驗證產品資料」ZIP，解壓後把原始欄位轉成 JSON。
 * 對應 DATA_SOURCES.md 的「① MIT 微笑標章通過驗證產品資料」。
 *
 * 用法：npm run fetch:mit
 * 輸出：data-raw/mit-products.json（原始欄位，未做地址查詢/geocoding/分類判斷）
 */
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import AdmZip from "adm-zip";
import { parse as parseCsv } from "csv-parse/sync";
import iconv from "iconv-lite";
import * as XLSX from "xlsx";

const SOURCE_URL = "https://keid.nat.gov.tw/mittw/Files/Download/productlist.zip";

const ROOT_DIR = path.dirname(fileURLToPath(import.meta.url)) + "/..";
const DATA_RAW_DIR = path.join(ROOT_DIR, "data-raw");
const ZIP_PATH = path.join(DATA_RAW_DIR, "productlist.zip");
const OUTPUT_PATH = path.join(DATA_RAW_DIR, "mit-products.json");

async function downloadZip(url: string): Promise<Buffer> {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`下載失敗：${url} 回應 ${res.status} ${res.statusText}`);
  }
  return Buffer.from(await res.arrayBuffer());
}

/** 從 ZIP 裡挑出資料檔（優先 CSV，其次 XLS/XLSX） */
function pickDataEntry(zip: AdmZip): AdmZip.IZipEntry {
  const entries = zip.getEntries().filter((e) => !e.isDirectory);
  if (entries.length === 0) {
    throw new Error("ZIP 內沒有任何檔案");
  }
  const byExt = (ext: string) =>
    entries.find((e) => e.entryName.toLowerCase().endsWith(ext));
  const picked = byExt(".csv") ?? byExt(".xlsx") ?? byExt(".xls");
  if (!picked) {
    const names = entries.map((e) => e.entryName).join(", ");
    throw new Error(
      `ZIP 內找不到可解析的 CSV/XLS/XLSX 檔案，實際內容有：${names}`,
    );
  }
  return picked;
}

/** 政府資料常見 Big5 編碼，用 UTF-8 round-trip 檢查來判斷實際編碼 */
function decodeText(buffer: Buffer): string {
  const hasUtf8Bom =
    buffer.length >= 3 &&
    buffer[0] === 0xef &&
    buffer[1] === 0xbb &&
    buffer[2] === 0xbf;
  if (hasUtf8Bom) {
    return buffer.slice(3).toString("utf8");
  }
  const asUtf8 = buffer.toString("utf8");
  const isValidUtf8 = Buffer.from(asUtf8, "utf8").equals(buffer);
  return isValidUtf8 ? asUtf8 : iconv.decode(buffer, "big5");
}

/** 去掉字串欄位頭尾空白，並濾掉整列全空的資料 */
function cleanRecords(records: Record<string, unknown>[]): Record<string, unknown>[] {
  return records
    .map((record) => {
      const cleaned: Record<string, unknown> = {};
      for (const [key, value] of Object.entries(record)) {
        const cleanKey = key.trim();
        cleaned[cleanKey] = typeof value === "string" ? value.trim() : value;
      }
      return cleaned;
    })
    .filter((record) => Object.values(record).some((v) => v !== "" && v != null));
}

function parseEntry(entry: AdmZip.IZipEntry): Record<string, unknown>[] {
  const buffer = entry.getData();
  const name = entry.entryName.toLowerCase();

  if (name.endsWith(".csv")) {
    const text = decodeText(buffer);
    const records = parseCsv(text, {
      columns: true,
      skip_empty_lines: true,
      bom: true,
      trim: true,
    }) as Record<string, unknown>[];
    return cleanRecords(records);
  }

  if (name.endsWith(".xlsx") || name.endsWith(".xls")) {
    const workbook = XLSX.read(buffer, { type: "buffer" });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const records = XLSX.utils.sheet_to_json(sheet, { defval: "" }) as Record<
      string,
      unknown
    >[];
    return cleanRecords(records);
  }

  throw new Error(`不支援的檔案格式：${entry.entryName}`);
}

async function main() {
  await mkdir(DATA_RAW_DIR, { recursive: true });

  console.log(`下載 ${SOURCE_URL} ...`);
  const zipBuffer = await downloadZip(SOURCE_URL);
  await writeFile(ZIP_PATH, zipBuffer);
  console.log(`已存檔：${ZIP_PATH}`);

  const zip = new AdmZip(zipBuffer);
  const entry = pickDataEntry(zip);
  console.log(`解析：${entry.entryName}`);

  const products = parseEntry(entry);
  console.log(`解析出 ${products.length} 筆產品資料`);

  const output = {
    source: SOURCE_URL,
    fetchedAt: new Date().toISOString(),
    count: products.length,
    products,
  };

  await writeFile(OUTPUT_PATH, JSON.stringify(output, null, 2), "utf8");
  console.log(`已輸出：${OUTPUT_PATH}`);
}

main().catch((err) => {
  console.error("fetch-mit 失敗：", err instanceof Error ? err.message : err);
  process.exitCode = 1;
});
