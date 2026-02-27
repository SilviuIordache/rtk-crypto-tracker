import CoinsList from './components/CoinsList'
import CoinPortfolio from './components/CoinPortfolio'
import Transactions from './components/Transactions'
import WatchList from './components/WatchList'

function App() {
  return (
    <div className="min-h-screen bg-radial-[at_20%_0%] from-slate-900 via-slate-950 to-slate-950 text-slate-200">
      <nav className="border-b border-slate-800 bg-slate-950/80 backdrop-blur">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-4">
          <h1 className="text-lg font-semibold tracking-tight text-slate-100">
            Crypto Dashboard
          </h1>
          <button
            type="button"
            className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm font-medium text-slate-200 transition-colors hover:bg-slate-800"
          >
            Home
          </button>
        </div>
      </nav>

      <main className="mx-auto w-full max-w-7xl px-6 py-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:items-start">
          <div className="grid gap-6">
            <WatchList />
            <CoinPortfolio />
            <Transactions />
          </div>
          <CoinsList />
        </div>
      </main>
    </div>
  )
}

export default App
