import { useDispatch, useSelector } from 'react-redux'
import { toggleWatchlistCoin } from '../features/watchlist/watchlistSlice'
import { useGetPricesQuery } from '../services/cryptoApi'
import CoinRow from './CoinRow'

function WatchList() {
  const dispatch = useDispatch()
  const watchlistIds = useSelector((state) => state.watchlist.ids)
  const {
    data: prices = [],
    error,
    isLoading,
  } = useGetPricesQuery(undefined, {
    pollingInterval: 60 * 1000,
    refetchOnFocus: true,
    refetchOnReconnect: true,
  })

  const watchedCoins = prices.filter((coin) => watchlistIds.includes(coin.id))

  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 shadow-xl shadow-slate-950/40">
      <header className="mb-4">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-300">
          My Watchlist
        </h2>
        <p className="mt-1 text-xs text-slate-500">
          {watchedCoins.length} coin{watchedCoins.length === 1 ? '' : 's'} selected
        </p>
      </header>

      {isLoading && <p className="my-3 text-sm text-slate-300">Loading prices...</p>}
      {error && (
        <p className="my-3 text-sm text-rose-300">
          Could not load prices right now. Please try again.
        </p>
      )}

      {!isLoading && !error && watchedCoins.length === 0 && (
        <p className="my-3 text-sm text-slate-400">No coins selected yet.</p>
      )}

      {!isLoading && !error && watchedCoins.length > 0 && (
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
    </section>
  )
}

export default WatchList
