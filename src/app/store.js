import { configureStore } from '@reduxjs/toolkit'
import { cryptoApi } from '../services/cryptoApi'
import portfolioReducer from '../features/portfolio/portfolioSlice'
import {
  loadPortfolioState,
  savePortfolioState,
} from '../features/portfolio/storage'
import watchlistReducer from '../features/watchlist/watchlistSlice'
import {
  loadWatchlistState,
  saveWatchlistState,
} from '../features/watchlist/storage'

const preloadedState = {
  ...(loadWatchlistState() ?? {}),
  ...(loadPortfolioState() ?? {}),
}

export const store = configureStore({
  reducer: {
    [cryptoApi.reducerPath]: cryptoApi.reducer,
    portfolio: portfolioReducer,
    watchlist: watchlistReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(cryptoApi.middleware),
  preloadedState,
})

store.subscribe(() => {
  const state = store.getState()
  saveWatchlistState(state.watchlist)
  savePortfolioState(state.portfolio)
})
