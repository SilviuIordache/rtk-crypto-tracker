import { useSelector } from 'react-redux'
import PurchaseCard from './PurchaseCard'

function Purchases() {
  const purchases = useSelector((state) => state.portfolio.purchases)
  const sortedPurchases = [...purchases].sort(
    (a, b) => new Date(b.purchasedAt).getTime() - new Date(a.purchasedAt).getTime(),
  )

  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 shadow-xl shadow-slate-950/40">
      <header className="mb-4">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-300">
          Purchases
        </h2>
        <p className="mt-1 text-xs text-slate-500">
          {purchases.length} transaction{purchases.length === 1 ? '' : 's'}
        </p>
      </header>

      {purchases.length === 0 ? (
        <p className="my-3 text-sm text-slate-400">No purchases yet.</p>
      ) : (
        <ul className="grid gap-2">
          {sortedPurchases.map((purchase) => (
            <PurchaseCard key={purchase.id} purchase={purchase} />
          ))}
        </ul>
      )}
    </section>
  )
}

export default Purchases
