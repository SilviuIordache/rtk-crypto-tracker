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

    if (!Array.isArray(parsedPortfolio?.purchases)) {
      return undefined
    }

    return {
      portfolio: {
        purchases: parsedPortfolio.purchases,
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
      JSON.stringify({ purchases: portfolioState.purchases }),
    )
  } catch {
    // Ignore persistence errors to avoid breaking app behavior.
  }
}
