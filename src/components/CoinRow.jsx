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
  return (
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
      <button
        type="button"
        className={`rounded-md border px-2.5 py-1.5 text-xs font-semibold transition-colors ${getWatchButtonClass(isWatched)}`}
        onClick={onToggle}
      >
        {isWatched ? 'Remove' : 'Add'}
      </button>
    </li>
  )
}

export default CoinRow
