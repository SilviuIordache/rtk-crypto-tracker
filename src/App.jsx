import './App.css'
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
    <main className="page">
      <section className="card">
        <header className="header">
          <div>
            <h1>RTK Crypto Tracker</h1>
            <p>Live prices from Coinranking with RTK Query</p>
          </div>
          <button type="button" onClick={refetch} disabled={isFetching}>
            {isFetching ? 'Refreshing...' : 'Refresh'}
          </button>
        </header>

        {isLoading && <p className="status">Loading prices...</p>}
        {error && (
          <p className="status error">
            Could not load prices right now. Please try again.
          </p>
        )}

        {!isLoading && !error && (
          <>
            <h2 className="section-title">My Watchlist</h2>
            {watchedCoins.length === 0 ? (
              <p className="status">No coins selected yet.</p>
            ) : (
              <ul className="coin-list">
                {watchedCoins.map((coin) => (
                  <li key={coin.id} className="coin-item">
                    <div className="coin-main">
                      <div className="coin-meta">
                        {coin.iconUrl && (
                          <img
                            src={coin.iconUrl}
                            alt={`${coin.name} icon`}
                            className="coin-icon"
                            loading="lazy"
                          />
                        )}
                        <span>{coin.name}</span>
                      </div>
                      <strong>{formatUsdPrice(coin.usd)}</strong>
                    </div>
                    <button
                      type="button"
                      className="watch-button remove"
                      onClick={() => dispatch(toggleWatchlistCoin(coin.id))}
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            )}

            <h2 className="section-title">All Coins</h2>
            <ul className="coin-list">
              {prices.map((coin) => {
                const isWatched = watchlistIds.includes(coin.id)

                return (
                  <li key={coin.id} className="coin-item">
                    <div className="coin-main">
                      <div className="coin-meta">
                        {coin.iconUrl && (
                          <img
                            src={coin.iconUrl}
                            alt={`${coin.name} icon`}
                            className="coin-icon"
                            loading="lazy"
                          />
                        )}
                        <span>{coin.name}</span>
                      </div>
                      <strong>{formatUsdPrice(coin.usd)}</strong>
                    </div>
                    <button
                      type="button"
                      className={`watch-button ${isWatched ? 'remove' : 'add'}`}
                      onClick={() => dispatch(toggleWatchlistCoin(coin.id))}
                    >
                      {isWatched ? 'Remove' : 'Add'}
                    </button>
                  </li>
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
