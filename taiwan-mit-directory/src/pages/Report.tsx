export default function Report() {
  return (
    <div className="mx-auto max-w-2xl px-5 py-10">
      <h1 className="font-display font-black text-3xl mb-4">回報產地爭議</h1>
      <p className="text-ink/70 text-sm leading-relaxed mb-8">
        表單骨架先放這裡。送出後建議把商品狀態改成
        <code className="font-mono text-xs mx-1">disputed</code>
        （見 OriginBadge 的樣式對應），並保留回報來源以利後續查核。
      </p>
      <div className="tile-floor border border-ink/10 rounded-sm h-64 flex items-center justify-center">
        <p className="font-mono text-xs text-ink/40">[ 表單插槽 · FORM SLOT ]</p>
      </div>
    </div>
  );
}
