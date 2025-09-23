import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { ExchangeRecord } from '@/types/crypto'

export const useHistoryStore = defineStore('history', () => {
  const history = ref<ExchangeRecord[]>([])

  function addRecord(record: ExchangeRecord) {
    history.value.unshift(record)
  }

  return { history, addRecord }
})
