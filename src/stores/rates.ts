import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'
import { getRates } from '@/api/crypto'
import type { CryptoId } from '@/types/crypto'

type RateItem = { id: CryptoId; usd: number }

export const useRatesStore = defineStore('rates', () => {
  const rates = reactive<RateItem[]>([
    { id: 'bitcoin', usd: 0 },
    { id: 'ethereum', usd: 0 },
    { id: 'tether', usd: 0 },
    { id: 'solana', usd: 0 },
  ])

  const isLoading = ref(false)
  const error = ref<string | null>(null)

  async function fetchRates() {
    try {
      error.value = null
      const data = await getRates()
      rates.forEach((rate) => {
        if (data[rate.id]?.usd != null) {
          rate.usd = data[rate.id]?.usd ?? rate.usd
        }
      })
    } catch (err) {
      error.value = err instanceof Error ? err.message : String(err)
    } finally {
      isLoading.value = false
    }
  }

  function startAutoRefresh(interval = 30000) {
    fetchRates()
    setInterval(fetchRates, interval)
  }

  return { rates, isLoading, error, fetchRates, startAutoRefresh }
})
