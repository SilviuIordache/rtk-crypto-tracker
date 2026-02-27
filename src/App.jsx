import { useDispatch, useSelector } from 'react-redux'
import { toggleWatchlistCoin } from './features/watchlist/watchlistSlice'
import { useGetPricesQuery } from './services/cryptoApi'

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

function App() {
  const dispatch = useDispatch()
  const watchlistIds = useSelector((state) => state.watchlist.ids)
  const {
    data: prices = [],
    error,
    isLoading,
    isFetching,
    refetch,
  } = useGetPricesQuery(undefined, {
    pollingInterval: 60 * 1000, // Refetch every 60 seconds
    refetchOnFocus: true,
    refetchOnReconnect: true,
  })
  const watchedCoins = prices.filter((coin) => watchlistIds.includes(coin.id))

  return (
    <main className="min-h-screen bg-radial-[at_20%_0%] from-slate-900 via-slate-950 to-slate-950 px-6 py-10 text-slate-200">
      <section className="mx-auto w-full max-w-3xl rounded-2xl border border-slate-800 bg-slate-900/70 p-5 shadow-2xl shadow-slate-950/60 backdrop-blur">
        <header className="mb-4 flex items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">
              RTK Crypto Tracker
            </h1>
            <p className="mt-1 text-sm text-slate-400">
              Live prices from Coinranking with RTK Query
            </p>
          </div>
          <button
            type="button"
            onClick={refetch}
            disabled={isFetching}
            className="rounded-lg border border-blue-700 bg-blue-700 px-3 py-2 text-sm font-semibold text-blue-100 transition-colors hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isFetching ? 'Refreshing...' : 'Refresh'}
          </button>
        </header>

        {isLoading && <p className="my-4 text-slate-300">Loading prices...</p>}
        {error && (
          <p className="my-4 text-rose-300">
            Could not load prices right now. Please try again.
          </p>
        )}

        {!isLoading && !error && (
          <>
            <h2 className="mt-5 mb-3 text-sm font-semibold uppercase tracking-wide text-slate-300">
              My Watchlist
            </h2>
            {watchedCoins.length === 0 ? (
              <p className="my-4 text-slate-400">No coins selected yet.</p>
            ) : (
              <ul className="grid gap-2">
                {watchedCoins.map((coin) => (
                  <CoinRow
                    key={coin.id}
                    coin={coin}
                    isWatched
                    onToggle={() => dispatch(toggleWatchlistCoin(coin.id))}
                  />
                ))}
              </ul>
            )}

            <h2 className="mt-6 mb-3 text-sm font-semibold uppercase tracking-wide text-slate-300">
              All Coins
            </h2>
            <ul className="grid gap-2">
              {prices.map((coin) => {
                const isWatched = watchlistIds.includes(coin.id)

                return (
                  <CoinRow
                    key={coin.id}
                    coin={coin}
                    isWatched={isWatched}
                    onToggle={() => dispatch(toggleWatchlistCoin(coin.id))}
                  />
                )
              })}
            </ul>
          </>
        )}
      </section>
    </main>
  )
}

export default App
