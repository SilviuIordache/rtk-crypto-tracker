import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const trackedCoins = ['bitcoin', 'ethereum', 'solana']

export const cryptoApi = createApi({
  reducerPath: 'cryptoApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/' }),
  endpoints: (builder) => ({
    getPrices: builder.query({
      query: () => ({
        url: 'simple/price',
        params: {
          ids: trackedCoins.join(','),
          vs_currencies: 'usd',
        },
      }),
      transformResponse: (response) =>
        trackedCoins.map((id) => ({
          id,
          usd: response[id]?.usd ?? null,
        })),
    }),
  }),
})

export const { useGetPricesQuery } = cryptoApi
