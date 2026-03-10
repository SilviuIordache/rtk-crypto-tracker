import { NavLink, Navigate, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import PortfolioPage from './pages/PortfolioPage'
import TransactionsPage from './pages/TransactionsPage'
import WatchlistPage from './pages/WatchlistPage'

const navItems = [
  { to: '/', label: 'Home', end: true },
  { to: '/watchlist', label: 'Watchlist' },
  { to: '/portfolio', label: 'Portfolio' },
  { to: '/transactions', label: 'Transactions' },
]

function getNavClass(isActive) {
  return isActive
    ? 'text-slate-100'
    : 'text-slate-500 hover:text-slate-300'
}

function App() {
  const [homeItem, ...secondaryItems] = navItems

  return (
    <div className="min-h-screen bg-radial-[at_20%_0%] from-slate-900 via-slate-950 to-slate-950 text-slate-200">
      <nav className="border-b border-slate-800 bg-slate-950/80 backdrop-blur">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center">
            <NavLink
              to={homeItem.to}
              end={homeItem.end}
              className={({ isActive }) =>
                `text-sm font-medium transition-colors ${getNavClass(isActive)}`
              }
            >
              {homeItem.label}
            </NavLink>
          </div>

          <div className="flex flex-wrap items-center gap-6">
            {secondaryItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors ${getNavClass(isActive)}`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </div>
        </div>
      </nav>

      <main className="mx-auto w-full max-w-7xl px-6 py-6">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/watchlist" element={<WatchlistPage />} />
          <Route path="/portfolio" element={<PortfolioPage />} />
          <Route path="/transactions" element={<TransactionsPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
