import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { buildPortfolioSnapshot } from '../features/portfolio/portfolioCalculations'
import { selectPortfolioTransactions } from '../features/portfolio/selectors'
import { useGetPricesQuery } from '../services/cryptoApi'
import PortfolioPositionRow from './portfolio/PortfolioPositionRow'
import PortfolioSummaryTiles from './portfolio/PortfolioSummaryTiles'

function CoinPortfolio() {
  const transactions = useSelector(selectPortfolioTransactions)
  const { data: prices = [] } = useGetPricesQuery(undefined, {
    pollingInterval: 60 * 1000,
    refetchOnFocus: true,
    refetchOnReconnect: true,
  })

  const { positions, totalInvested, totalCurrentValue, totalPnl, totalPnlPercent } =
    useMemo(() => buildPortfolioSnapshot(transactions, prices), [transactions, prices])

  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 shadow-xl shadow-slate-950/40">
      <header className="mb-4">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-300">
          Coin Portfolio
        </h2>
        <p className="mt-1 text-xs text-slate-500">
          Snapshot of your current positions
        </p>
      </header>

      <PortfolioSummaryTiles
        totalCurrentValue={totalCurrentValue}
        totalInvested={totalInvested}
        totalPnl={totalPnl}
        totalPnlPercent={totalPnlPercent}
      />

      {positions.length === 0 ? (
        <p className="mt-4 text-sm text-slate-400">
          Your bought coins will be displayed here
        </p>
      ) : (
        <ul className="mt-4 grid gap-2">
          {positions.map((position) => {
            const weight =
              totalCurrentValue > 0
                ? (position.currentValue / totalCurrentValue) * 100
                : 0

            return (
              <PortfolioPositionRow
                key={position.coinId}
                position={position}
                weight={weight}
              />
            )
          })}
        </ul>
      )}
    </section>
  )
}

export default CoinPortfolio
