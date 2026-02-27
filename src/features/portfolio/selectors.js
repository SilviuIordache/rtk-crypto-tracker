import { createSelector } from '@reduxjs/toolkit'
import { sortTransactionsByDate } from './portfolioCalculations'

export const selectPortfolioState = (state) => state.portfolio

export const selectPortfolioTransactions = createSelector(
  selectPortfolioState,
  (portfolio) => portfolio.transactions,
)

export const selectSortedPortfolioTransactions = createSelector(
  selectPortfolioTransactions,
  (transactions) => sortTransactionsByDate(transactions),
)
