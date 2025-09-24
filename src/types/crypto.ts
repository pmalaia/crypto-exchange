export type CryptoId = 'bitcoin' | 'ethereum' | 'tether' | 'solana'

export type CryptoSymbol = 'BTC' | 'ETH' | 'USDT' | 'SOL'

export type CryptoRates = Record<CryptoId, { usd: number }>

export type ExchangeRecord = {
  from: CryptoId
  to: CryptoId
  amount: number
  result: number
  date: string
}

export type RateItem = { id: CryptoId } & CryptoRates[CryptoId]
