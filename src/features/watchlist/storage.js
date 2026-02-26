const WATCHLIST_STORAGE_KEY = 'rtk-crypto-watchlist'

export function loadWatchlistState() {
  if (typeof window === 'undefined') {
    return undefined
  }

  try {
    const serializedWatchlist = window.localStorage.getItem(WATCHLIST_STORAGE_KEY)

    if (!serializedWatchlist) {
      return undefined
    }

    const parsedWatchlist = JSON.parse(serializedWatchlist)

    if (!Array.isArray(parsedWatchlist?.ids)) {
      return undefined
    }

    return {
      watchlist: {
        ids: parsedWatchlist.ids.filter((id) => typeof id === 'string'),
      },
    }
  } catch {
    return undefined
  }
}

export function saveWatchlistState(watchlistState) {
  if (typeof window === 'undefined') {
    return
  }

  try {
    window.localStorage.setItem(
      WATCHLIST_STORAGE_KEY,
      JSON.stringify({ ids: watchlistState.ids }),
    )
  } catch {
    // Ignore persistence errors to avoid breaking app behavior.
  }
}
