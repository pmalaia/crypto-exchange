<template>
  <div class="p-4 border rounded-md shadow-sm">
    <h2 class="text-lg font-semibold mb-3">Exchange History</h2>

    <div v-if="!historyStore.history.length" class="text-gray-500">No exchanges yet.</div>

    <table v-else class="w-full border-collapse text-sm">
      <thead>
        <tr class="bg-gray-100">
          <th class="p-2 border text-left">Date</th>
          <th class="p-2 border text-right">From</th>
          <th class="p-2 border text-right">To</th>
          <th class="p-2 border text-right">Result</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in historyStore.history" :key="index">
          <td class="p-2 border">{{ formatDate(item.date) }}</td>
          <td class="p-2 border text-right">{{ item.amount }} {{ item.from.toUpperCase() }}</td>
          <td class="p-2 border text-right">
            {{ item.result.toFixed(6) }} {{ item.to.toUpperCase() }}
          </td>
          <td class="p-2 border text-right font-semibold">
            {{ item.to.toUpperCase() }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { useHistoryStore } from '@/stores/history'

const historyStore = useHistoryStore()

function formatDate(dateStr: string): string {
  const d = new Date(dateStr)
  return d.toLocaleString()
}
</script>
