import type { CryptoRates, CryptoId } from '@/types/crypto'
import { CRYPTO_API_URL } from '@/config/api'

export async function getRates(): Promise<CryptoRates> {
  try {
    const res = await fetch(CRYPTO_API_URL)

    if (!res.ok) {
      throw new Error(`API error: ${res.status} ${res.statusText}`)
    }

    const data = (await res.json()) as Partial<CryptoRates>

    const required: CryptoId[] = ['bitcoin', 'ethereum', 'tether', 'solana']
    for (const id of required) {
      if (!data[id] || typeof data[id]?.usd !== 'number') {
        throw new Error(`Missing or invalid data for ${id}`)
      }
    }

    return data as CryptoRates
  } catch (err) {
    if (err instanceof Error) {
      console.error('Failed to fetch crypto rates:', err.message)
      throw err
    } else {
      console.error('Unknown error:', err)
      throw new Error('Unknown error while fetching crypto rates')
    }
  }
}
