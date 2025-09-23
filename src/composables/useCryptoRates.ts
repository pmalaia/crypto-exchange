import { ref, onMounted, onUnmounted } from 'vue'
import { getRates } from '@/api/crypto'
import type { CryptoRates } from '@/types/crypto'

export function useCryptoRates(interval = 30000) {
  const rates = ref<CryptoRates | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  let timer: number | null = null

  const fetchRates = async () => {
    loading.value = true
    error.value = null
    try {
      rates.value = await getRates()
    } catch (err: any) {
      error.value = err.message || 'Failed to fetch rates'
    } finally {
      loading.value = false
    }
  }

  const startPolling = () => {
    stopPolling()
    timer = window.setInterval(() => {
      if (document.visibilityState === 'visible') {
        fetchRates()
      }
    }, interval)
  }

  const stopPolling = () => {
    if (timer) {
      clearInterval(timer)
      timer = null
    }
  }

  const handleVisibility = () => {
    if (document.visibilityState === 'visible') {
      fetchRates()
      startPolling()
    } else {
      stopPolling()
    }
  }

  onMounted(() => {
    fetchRates()
    startPolling()
    document.addEventListener('visibilitychange', handleVisibility)
  })

  onUnmounted(() => {
    stopPolling()
    document.removeEventListener('visibilitychange', handleVisibility)
  })

  return { rates, loading, error }
}
