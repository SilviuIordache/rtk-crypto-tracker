import { configureStore } from '@reduxjs/toolkit'
import { cryptoApi } from '../services/cryptoApi'
import watchlistReducer from '../features/watchlist/watchlistSlice'
import {
  loadWatchlistState,
  saveWatchlistState,
} from '../features/watchlist/storage'

const preloadedState = loadWatchlistState()

export const store = configureStore({
  reducer: {
    [cryptoApi.reducerPath]: cryptoApi.reducer,
    watchlist: watchlistReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(cryptoApi.middleware),
  preloadedState,
})

store.subscribe(() => {
  saveWatchlistState(store.getState().watchlist)
})
