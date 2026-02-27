function formatUsdPrice(value) {
  if (value === null) {
    return 'N/A'
  }

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: value > 100 ? 2 : 6,
  }).format(value)
}

function formatChange(value) {
  if (value === null || Number.isNaN(value)) {
    return 'N/A'
  }

  const sign = value > 0 ? '+' : ''
  return `${sign}${value.toFixed(2)}%`
}

function getChangeClass(value) {
  if (value === null || Number.isNaN(value)) {
    return 'text-slate-400'
  }

  if (value > 0) {
    return 'text-emerald-400'
  }

  if (value < 0) {
    return 'text-rose-400'
  }

  return 'text-slate-400'
}

function getWatchButtonClass(isWatched) {
  if (isWatched) {
    return 'border-red-700 bg-red-900/80 text-red-100 hover:bg-red-700'
  }

  return 'border-teal-700 bg-teal-800 text-teal-100 hover:bg-teal-700'
}

function CoinRow({ coin, isWatched, onToggle }) {
  const [isBuyModalOpen, setIsBuyModalOpen] = useState(false)
  const [usdAmount, setUsdAmount] = useState('')

  const closeBuyModal = () => {
    setIsBuyModalOpen(false)
    setUsdAmount('')
  }

  const handleBuy = (event) => {
    event.preventDefault()
    closeBuyModal()
  }

  return (
    <>
      <li className="flex items-center justify-between gap-3 rounded-xl border border-slate-700 bg-slate-900 px-4 py-3">
        <div className="flex min-w-0 flex-1 items-center justify-between gap-4">
          <div className="flex min-w-0 items-center gap-2.5">
            {coin.iconUrl && (
              <img
                src={coin.iconUrl}
                alt={`${coin.name} icon`}
                className="h-[22px] w-[22px] shrink-0 object-contain"
                loading="lazy"
              />
            )}
            <span className="truncate text-sm text-slate-100">{coin.name}</span>
          </div>
          <div className="whitespace-nowrap text-right">
            <p className="text-sm font-semibold text-slate-100">
              {formatUsdPrice(coin.usd)}
            </p>
            <p className={`text-xs font-semibold ${getChangeClass(coin.change24h)}`}>
              {formatChange(coin.change24h)}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="rounded-md border border-indigo-700 bg-indigo-800 px-2.5 py-1.5 text-xs font-semibold text-indigo-100 transition-colors hover:bg-indigo-700"
            onClick={() => setIsBuyModalOpen(true)}
          >
            Buy
          </button>
          <button
            type="button"
            className={`rounded-md border px-2.5 py-1.5 text-xs font-semibold transition-colors ${getWatchButtonClass(isWatched)}`}
            onClick={onToggle}
          >
            {isWatched ? 'Remove' : 'Add'}
          </button>
        </div>
      </li>

      {isBuyModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 px-4">
          <form
            onSubmit={handleBuy}
            className="w-full max-w-sm rounded-2xl border border-slate-700 bg-slate-900 p-5 shadow-2xl shadow-slate-950/70"
          >
            <h3 className="text-base font-semibold text-slate-100">
              Buy {coin.name}
            </h3>
            <label className="mt-4 block text-sm text-slate-300">
              Amount (USD)
              <input
                type="number"
                inputMode="decimal"
                min="0"
                step="any"
                required
                value={usdAmount}
                onChange={(event) => setUsdAmount(event.target.value)}
                className="mt-2 w-full rounded-lg border border-slate-600 bg-slate-950 px-3 py-2 text-slate-100 outline-none ring-0 placeholder:text-slate-500 focus:border-blue-500"
                placeholder="100"
              />
            </label>
            <div className="mt-5 flex justify-end gap-2">
              <button
                type="button"
                onClick={closeBuyModal}
                className="rounded-md border border-slate-600 bg-slate-800 px-3 py-2 text-sm font-medium text-slate-200 transition-colors hover:bg-slate-700"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-md border border-emerald-700 bg-emerald-800 px-3 py-2 text-sm font-semibold text-emerald-100 transition-colors hover:bg-emerald-700"
              >
                Buy
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  )
}

export default CoinRow
import { useState } from 'react'
