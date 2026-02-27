function formatUsd(value) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 2,
  }).format(value)
}

function formatQuantity(value) {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 8,
  }).format(value)
}

function formatDate(value) {
  const date = new Date(value)

  if (Number.isNaN(date.getTime())) {
    return 'Unknown time'
  }

  return new Intl.DateTimeFormat('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(date)
}

function PurchaseCard({ purchase }) {
  return (
    <li className="rounded-xl border border-slate-700 bg-slate-900 px-4 py-3">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-slate-100">{purchase.coinName}</p>
          <p className="mt-1 text-xs text-slate-400">
            {formatDate(purchase.purchasedAt)}
          </p>
        </div>
        <p className="text-sm font-semibold text-slate-100">
          {formatUsd(purchase.usdAmount)}
        </p>
      </div>
      <div className="mt-2 flex items-center justify-between text-xs text-slate-400">
        <span>Qty: {formatQuantity(purchase.quantity)}</span>
        <span>Price: {formatUsd(purchase.priceUsd)}</span>
      </div>
    </li>
  )
}

export default PurchaseCard
