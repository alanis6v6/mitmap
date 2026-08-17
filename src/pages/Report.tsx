export default function Report() {
  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="heading-page mb-4">回報產地爭議</h1>
      <p className="text-body mb-8">
        表單骨架先放這裡。送出後建議把商品狀態改成
        <code className="font-mono text-xs mx-1">disputed</code>
        （見 OriginBadge 的樣式對應），並保留回報來源以利後續查核。
      </p>
      <div className="panel-card border-dashed h-64 flex items-center justify-center">
        <p className="text-hint">[ 表單插槽 · FORM SLOT ]</p>
      </div>
    </div>
  );
}
