export default function Submit() {
  return (
    <div className="mx-auto max-w-2xl px-5 py-10">
      <h1 className="font-display font-black text-3xl mb-4">推薦台灣製品牌</h1>
      <p className="text-ink/70 text-sm leading-relaxed mb-8">
        表單骨架先放這裡——之後接實際的送出邏輯（存資料庫 / 寄通知等）。
        欄位可以先參考 <code className="font-mono text-xs">Product</code> 與{" "}
        <code className="font-mono text-xs">Brand</code> 型別（見{" "}
        <code className="font-mono text-xs">src/data/types.ts</code>）決定要收哪些欄位。
      </p>
      <div className="tile-floor border border-ink/10 rounded-sm h-64 flex items-center justify-center">
        <p className="font-mono text-xs text-ink/40">[ 表單插槽 · FORM SLOT ]</p>
      </div>
    </div>
  );
}
