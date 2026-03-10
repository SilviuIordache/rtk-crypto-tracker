# RTK Crypto Tracker

Redux Toolkit + RTK Query demo built with React and Vite.

The app uses Coinranking for live market data and demonstrates:
- RTK Query data fetching and caching
- `createSlice` state for watchlist and portfolio transactions
- persisted local client state via `localStorage`
- route-based pages for coins, watchlist, portfolio, and transactions

## Live Demo

[https://rtk-crypto-tracker.vercel.app/](https://rtk-crypto-tracker.vercel.app/)

## Features

- Live crypto prices for a fixed tracked set of coins
- Watchlist with Redux persistence
- Buy flow that stores transactions in Redux
- Portfolio snapshot aggregated from saved transactions
- Transactions history page

## Routes

- `/` - all tracked coins
- `/watchlist` - saved watchlist
- `/portfolio` - aggregated portfolio summary
- `/transactions` - transaction history

## Local Development

1. Install dependencies:
   - `npm install`
2. Create a local `.env` file with:
   - `COINRANKING_API_KEY=your_key_here`
3. Start the dev server:
   - `npm run dev`

In local development, requests to `/api/coins` are proxied by Vite to Coinranking.

## Production / Vercel

For Vercel, add this environment variable in the project settings:
- name: `COINRANKING_API_KEY`
- value: your raw API key only

Do not paste `COINRANKING_API_KEY=` into the value field.

In production, the app uses the serverless function at [api/coins.js](/Users/silviuiordache/Desktop/web/rtk-crypto-tracker/api/coins.js) to forward requests to Coinranking so the API key stays server-side.

## Scripts

- `npm run dev` - start local development server
- `npm run build` - build production bundle
- `npm run preview` - preview production build locally
- `npm run lint` - run ESLint
