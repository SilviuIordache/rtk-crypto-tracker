import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  transactions: [],
}

const portfolioSlice = createSlice({
  name: 'portfolio',
  initialState,
  reducers: {
    buyCoin: {
      reducer: (state, action) => {
        state.transactions.push(action.payload)
      },
      prepare: ({ coinId, coinName, usdAmount, priceUsd, quantity }) => ({
        payload: {
          id:
            globalThis.crypto?.randomUUID?.() ??
            `${Date.now()}-${Math.floor(Math.random() * 1_000_000)}`,
          coinId,
          coinName,
          usdAmount,
          priceUsd,
          quantity,
          transactedAt: new Date().toISOString(),
        },
      }),
    },
  },
})

export const { buyCoin } = portfolioSlice.actions
export default portfolioSlice.reducer
