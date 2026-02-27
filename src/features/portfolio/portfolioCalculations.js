function getTransactionTimestamp(transaction) {
  return (
    new Date(transaction.transactedAt ?? transaction.purchasedAt ?? 0).getTime() || 0
  )
}

export function buildPortfolioSnapshot(transactions, prices) {
  const priceMap = new Map(prices.map((coin) => [coin.id, coin]))
  const grouped = new Map()

  for (const transaction of transactions) {
    const current = grouped.get(transaction.coinId)

    if (!current) {
      grouped.set(transaction.coinId, {
        coinId: transaction.coinId,
        coinName: transaction.coinName,
        quantity: transaction.quantity,
        investedUsd: transaction.usdAmount,
      })
      continue
    }

    current.quantity += transaction.quantity
    current.investedUsd += transaction.usdAmount
  }

  const positions = [...grouped.values()].map((position) => {
    const liveCoin = priceMap.get(position.coinId)
    const currentPrice = liveCoin?.usd ?? null
    const currentValue = currentPrice === null ? 0 : currentPrice * position.quantity
    const avgBuy = position.quantity > 0 ? position.investedUsd / position.quantity : 0
    const pnl = currentValue - position.investedUsd
    const pnlPercent = position.investedUsd > 0 ? (pnl / position.investedUsd) * 100 : 0

    return {
      ...position,
      coinName: liveCoin?.name ?? position.coinName,
      iconUrl: liveCoin?.iconUrl ?? null,
      avgBuy,
      currentPrice,
      currentValue,
      pnl,
      pnlPercent,
    }
  })

  positions.sort((a, b) => b.currentValue - a.currentValue)

  const totalInvested = positions.reduce((sum, position) => sum + position.investedUsd, 0)
  const totalCurrentValue = positions.reduce(
    (sum, position) => sum + position.currentValue,
    0,
  )
  const totalPnl = totalCurrentValue - totalInvested
  const totalPnlPercent = totalInvested > 0 ? (totalPnl / totalInvested) * 100 : 0

  return {
    positions,
    totalInvested,
    totalCurrentValue,
    totalPnl,
    totalPnlPercent,
  }
}

export function sortTransactionsByDate(transactions) {
  return [...transactions].sort(
    (a, b) => getTransactionTimestamp(b) - getTransactionTimestamp(a),
  )
}
