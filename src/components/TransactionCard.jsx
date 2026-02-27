import { formatDate, formatQuantity, formatUsd } from '../utils/formatters'

function TransactionCard({ transaction }) {
  const transactionDate = transaction.transactedAt ?? transaction.purchasedAt

  return (
    <li className="rounded-xl border border-slate-700 bg-slate-900 px-4 py-3">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-slate-100">
            {formatDate(transactionDate)}
          </p>
          <p className="mt-1 text-xs text-slate-400">{transaction.coinName}</p>
          <p className="mt-0.5 text-[11px] uppercase tracking-wide text-slate-500">
            Transaction
          </p>
        </div>
        <p className="text-sm font-semibold text-slate-100">
          {formatUsd(transaction.usdAmount)}
        </p>
      </div>
      <div className="mt-2 flex items-center justify-between text-xs text-slate-400">
        <span>Qty: {formatQuantity(transaction.quantity)}</span>
        <span>Price: {formatUsd(transaction.priceUsd)}</span>
      </div>
    </li>
  )
}

export default TransactionCard
