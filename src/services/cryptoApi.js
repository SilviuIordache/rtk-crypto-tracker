import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const trackedCoins = [
  { id: 'bitcoin', symbol: 'BTC', fallbackName: 'Bitcoin' },
  { id: 'ethereum', symbol: 'ETH', fallbackName: 'Ethereum' },
  { id: 'solana', symbol: 'SOL', fallbackName: 'Solana' },
  { id: 'xrp', symbol: 'XRP', fallbackName: 'XRP' },
  { id: 'dogecoin', symbol: 'DOGE', fallbackName: 'Dogecoin' },
  { id: 'cardano', symbol: 'ADA', fallbackName: 'Cardano' },
  { id: 'chainlink', symbol: 'LINK', fallbackName: 'Chainlink' },
]

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

        return trackedCoins.map((trackedCoin) => {
          const match = coins.find((coin) => coin.symbol === trackedCoin.symbol)

          return {
            id: trackedCoin.id,
            name: match?.name ?? trackedCoin.fallbackName,
            iconUrl: match?.iconUrl ?? null,
            usd: match ? Number(match.price) : null,
            change24h: match ? Number(match.change) : null,
          }
        })
      },
    }),
  }),
})

export const { useGetPricesQuery } = cryptoApi
