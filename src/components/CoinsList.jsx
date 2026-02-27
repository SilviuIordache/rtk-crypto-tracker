import { useDispatch, useSelector } from 'react-redux'
import { toggleWatchlistCoin } from '../features/watchlist/watchlistSlice'
import { useGetPricesQuery } from '../services/cryptoApi'
import CoinRow from './CoinRow'

function CoinsList() {
  const dispatch = useDispatch()
  const watchlistIds = useSelector((state) => state.watchlist.ids)
  const {
    data: prices = [],
    error,
    isLoading,
    isFetching,
    refetch,
  } = useGetPricesQuery(undefined, {
    pollingInterval: 60 * 1000,
    refetchOnFocus: true,
    refetchOnReconnect: true,
  })

  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 shadow-xl shadow-slate-950/40">
      <header className="mb-4 flex items-center justify-between gap-3">
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-300">
            All Coins
          </h2>
          <p className="mt-1 text-xs text-slate-500">Choose coins for your watchlist</p>
        </div>
        <button
          type="button"
          onClick={refetch}
          disabled={isFetching}
          className="rounded-lg border border-blue-700 bg-blue-700 px-3 py-2 text-xs font-semibold text-blue-100 transition-colors hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isFetching ? 'Refreshing...' : 'Refresh'}
        </button>
      </header>

      {isLoading && <p className="my-3 text-sm text-slate-300">Loading prices...</p>}
      {error && (
        <p className="my-3 text-sm text-rose-300">
          Could not load prices right now. Please try again.
        </p>
      )}

      {!isLoading && !error && (
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
      )}
    </section>
  )
}

export default CoinsList
