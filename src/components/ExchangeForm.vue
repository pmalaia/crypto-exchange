<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRatesStore } from '@/stores/rates'
import { useHistoryStore } from '@/stores/history'
import type { CryptoId } from '@/types/crypto'

const ratesStore = useRatesStore()
const historyStore = useHistoryStore()

const fromCurrency = ref<CryptoId>('bitcoin')
const toCurrency = ref<CryptoId>('ethereum')
const amount = ref<number>(1)

const result = computed(() => {
  const fromRate = ratesStore.rates.find((r) => r.id === fromCurrency.value)?.usd
  const toRate = ratesStore.rates.find((r) => r.id === toCurrency.value)?.usd

  if (!fromRate || !toRate || amount.value <= 0) return 0

  return (amount.value * fromRate) / toRate
})

function exchange() {
  if (amount.value <= 0 || fromCurrency.value === toCurrency.value) return

  const record = {
    from: fromCurrency.value,
    to: toCurrency.value,
    amount: amount.value,
    result: result.value,
    date: new Date().toISOString(),
  }

  historyStore.addRecord(record)
  amount.value = 0
}
</script>

<template>
  <div class="space-y-4">
    <div class="flex gap-2 items-center">
      <input type="number" v-model.number="amount" class="border p-2 rounded w-24" min="0" />

      <select v-model="fromCurrency" class="border p-2 rounded">
        <option value="bitcoin">BTC</option>
        <option value="ethereum">ETH</option>
        <option value="tether">USDT</option>
        <option value="solana">SOL</option>
      </select>

      <span>→</span>

      <select v-model="toCurrency" class="border p-2 rounded">
        <option value="bitcoin">BTC</option>
        <option value="ethereum">ETH</option>
        <option value="tether">USDT</option>
        <option value="solana">SOL</option>
      </select>
    </div>

    <div>
      Result: <strong>{{ result.toFixed(6) }}</strong> {{ toCurrency.toUpperCase() }}
    </div>

    <button
      @click="exchange"
      class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      :disabled="amount <= 0 || fromCurrency === toCurrency"
    >
      Exchange
    </button>
  </div>
</template>
