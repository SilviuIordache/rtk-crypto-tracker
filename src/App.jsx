import './App.css'
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
  const {
    data: prices = [],
    error,
    isLoading,
    isFetching,
    refetch,
  } = useGetPricesQuery(undefined, {
    pollingInterval: 15000,
    refetchOnFocus: true,
    refetchOnReconnect: true,
  })

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
          <ul className="coin-list">
            {prices.map((coin) => (
              <li key={coin.id} className="coin-item">
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
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  )
}

export default App
