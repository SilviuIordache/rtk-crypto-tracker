import { createSlice } from '@reduxjs/toolkit'

const watchlistSlice = createSlice({
  name: 'watchlist',
  initialState: {
    ids: [],
  },
  reducers: {
    toggleWatchlistCoin: (state, action) => {
      const coinId = action.payload

      if (typeof coinId !== 'string' || coinId.length === 0) {
        return
      }

      const existingIndex = state.ids.indexOf(coinId)

      if (existingIndex >= 0) {
        state.ids.splice(existingIndex, 1)
      } else {
        state.ids.push(coinId)
      }
    },
  },
})

export const { toggleWatchlistCoin } = watchlistSlice.actions
export default watchlistSlice.reducer
