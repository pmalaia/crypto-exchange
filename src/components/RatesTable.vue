<script setup lang="ts">
import type { RateItem } from '@/types/crypto'

defineProps<{
  rates: RateItem[]
  isLoading: boolean
  error: string | null
}>()

const cryptoSymbols: Record<string, string> = {
  bitcoin: 'BTC',
  ethereum: 'ETH',
  tether: 'USDT',
  solana: 'SOL',
}
</script>

<template>
  <div>
    <div v-if="isLoading" class="text-gray-500">Loading...</div>
    <div v-else-if="error" class="text-red-500">Error: {{ error }}</div>
    <table v-else class="w-full border-collapse text-sm">
      <thead>
        <tr class="bg-gray-100">
          <th class="p-2 border text-left">Currency</th>
          <th class="p-2 border text-right">Price (USD)</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="rate in rates" :key="rate.id">
          <td class="p-2 border">{{ cryptoSymbols[rate.id] }}</td>
          <td class="p-2 border text-right">{{ rate.usd.toFixed(2) }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
