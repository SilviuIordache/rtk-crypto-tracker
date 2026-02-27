import { useSelector } from 'react-redux'
import { selectSortedPortfolioTransactions } from '../features/portfolio/selectors'
import TransactionCard from './TransactionCard'

function Transactions() {
  const transactions = useSelector(selectSortedPortfolioTransactions)

  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 shadow-xl shadow-slate-950/40">
      <header className="mb-4">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-300">
          Transactions
        </h2>
        <p className="mt-1 text-xs text-slate-500">
          {transactions.length} transaction{transactions.length === 1 ? '' : 's'}
        </p>
      </header>

      {transactions.length === 0 ? (
        <p className="my-3 text-sm text-slate-400">No transactions yet.</p>
      ) : (
        <ul className="grid gap-2">
          {transactions.map((transaction) => (
            <TransactionCard key={transaction.id} transaction={transaction} />
          ))}
        </ul>
      )}
    </section>
  )
}

export default Transactions
