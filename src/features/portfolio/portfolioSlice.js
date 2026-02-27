import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  purchases: [],
}

const portfolioSlice = createSlice({
  name: 'portfolio',
  initialState,
  reducers: {
    buyCoin: {
      reducer: (state, action) => {
        state.purchases.push(action.payload)
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
          purchasedAt: new Date().toISOString(),
        },
      }),
    },
  },
})

export const { buyCoin } = portfolioSlice.actions
export default portfolioSlice.reducer
