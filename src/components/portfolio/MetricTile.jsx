function MetricTile({ label, value, tone = 'text-slate-100' }) {
  return (
    <div className="rounded-xl border border-slate-700 bg-slate-900 px-4 py-3">
      <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
        {label}
      </p>
      <p className={`mt-1 text-lg font-semibold ${tone}`}>{value}</p>
    </div>
  )
}

export default MetricTile
