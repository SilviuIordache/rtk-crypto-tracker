import { formatPercent, formatUsd } from '../../utils/formatters'
import MetricTile from './MetricTile'

function getPnlClass(value) {
  if (value > 0) {
    return 'text-emerald-400'
  }

  if (value < 0) {
    return 'text-rose-400'
  }

  return 'text-slate-100'
}

function PortfolioSummaryTiles({ totalCurrentValue, totalInvested, totalPnl, totalPnlPercent }) {
  return (
    <div className="grid gap-2 sm:grid-cols-3">
      <MetricTile label="Portfolio Value" value={formatUsd(totalCurrentValue)} />
      <MetricTile label="Total Invested" value={formatUsd(totalInvested)} />
      <MetricTile
        label="Unrealized PnL"
        value={`${formatUsd(totalPnl)} (${formatPercent(totalPnlPercent)})`}
        tone={getPnlClass(totalPnl)}
      />
    </div>
  )
}

export default PortfolioSummaryTiles
