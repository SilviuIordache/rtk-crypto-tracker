import { formatPercent, formatQuantity, formatUsd } from '../../utils/formatters'
import AllocationBar from './AllocationBar'

function getPnlClass(value) {
  if (value > 0) {
    return 'text-emerald-400'
  }

  if (value < 0) {
    return 'text-rose-400'
  }

  return 'text-slate-300'
}

function PortfolioPositionRow({ position, weight }) {
  return (
    <li className="rounded-xl border border-slate-700 bg-slate-900 px-4 py-3">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            {position.iconUrl && (
              <img
                src={position.iconUrl}
                alt={`${position.coinName} icon`}
                className="h-5 w-5 shrink-0 object-contain"
                loading="lazy"
              />
            )}
            <p className="truncate text-sm font-semibold text-slate-100">
              {position.coinName}
            </p>
          </div>
          <div className="mt-2 flex flex-wrap gap-1.5 text-[11px] text-slate-300">
            <span className="rounded-md border border-slate-600 bg-slate-800 px-2 py-0.5">
              Qty {formatQuantity(position.quantity)}
            </span>
            <span className="rounded-md border border-slate-600 bg-slate-800 px-2 py-0.5">
              Avg {formatUsd(position.avgBuy)}
            </span>
          </div>
        </div>
        <div className="whitespace-nowrap text-right">
          <p className="text-sm font-semibold text-slate-100">
            {formatUsd(position.currentValue)}
          </p>
          <p className={`text-xs font-semibold ${getPnlClass(position.pnl)}`}>
            {formatUsd(position.pnl)} ({formatPercent(position.pnlPercent)})
          </p>
        </div>
      </div>

      <AllocationBar weight={weight} />
    </li>
  )
}

export default PortfolioPositionRow
