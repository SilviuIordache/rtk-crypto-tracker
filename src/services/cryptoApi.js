import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const trackedCoins = ['bitcoin', 'ethereum', 'solana']

export const cryptoApi = createApi({
  reducerPath: 'cryptoApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/' }),
  endpoints: (builder) => ({
    getPrices: builder.query({
      query: () => ({
        url: 'coins',
        params: {
          limit: 100,
          orderBy: 'marketCap',
          orderDirection: 'desc',
        },
      }),
      transformResponse: (response) => {
        const coins = response?.data?.coins ?? []

        return trackedCoins.map((slug) => {
          const match = coins.find((coin) => coin.slug === slug)

          return {
            id: slug,
            name: match?.name ?? slug,
            usd: match ? Number(match.price) : null,
          }
        })
      },
    }),
  }),
})

export const { useGetPricesQuery } = cryptoApi
