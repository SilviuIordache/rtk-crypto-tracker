const PORTFOLIO_STORAGE_KEY = 'rtk-crypto-portfolio'

export function loadPortfolioState() {
  if (typeof window === 'undefined') {
    return undefined
  }

  try {
    const serializedPortfolio = window.localStorage.getItem(PORTFOLIO_STORAGE_KEY)

    if (!serializedPortfolio) {
      return undefined
    }

    const parsedPortfolio = JSON.parse(serializedPortfolio)

    const rawTransactions = Array.isArray(parsedPortfolio?.transactions)
      ? parsedPortfolio.transactions
      : Array.isArray(parsedPortfolio?.purchases)
        ? parsedPortfolio.purchases
        : null

    if (!rawTransactions) {
      return undefined
    }

    return {
      portfolio: {
        transactions: rawTransactions,
      },
    }
  } catch {
    return undefined
  }
}

export function savePortfolioState(portfolioState) {
  if (typeof window === 'undefined') {
    return
  }

  try {
    window.localStorage.setItem(
      PORTFOLIO_STORAGE_KEY,
      JSON.stringify({ transactions: portfolioState.transactions }),
    )
  } catch {
    // Ignore persistence errors to avoid breaking app behavior.
  }
}
