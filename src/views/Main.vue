<template>
  <div class="min-h-screen bg-gray-50 text-gray-900 p-6">
    <div class="grid grid-cols-1 gap-6">
      <h1 class="text-4xl font-bold text-center">Crypto Exchange</h1>

      <section class="p-4 rounded-lg shadow">
        <h2 class="text-xl font-semibold mb-4">Live Rates</h2>
        <RatesTable
          :rates="ratesStore.rates"
          :isLoading="ratesStore.isLoading"
          :error="ratesStore.error"
        />
      </section>

      <section class="p-4 rounded-lg shadow">
        <h2 class="text-xl font-semibold mb-4">Exchange</h2>
        <ExchangeForm />
      </section>

      <section class="p-4 rounded-lg shadow">
        <ExchangeHistory />
      </section>
    </div>
  </div>
</template>
<script setup lang="ts">
import { onMounted } from 'vue'
import { useRatesStore } from '@/stores/rates'
import RatesTable from '@/components/RatesTable.vue'
import ExchangeForm from '@/components/ExchangeForm.vue'
import ExchangeHistory from '@/components/ExchangeHistory.vue'

const ratesStore = useRatesStore()

onMounted(() => {
  ratesStore.startAutoRefresh(30000)
})
</script>
