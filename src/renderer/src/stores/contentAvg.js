import { defineStore } from 'pinia'

export const useContentAvgStore = defineStore('contentAvg', {
  state: () => ({ contentAvg: '' }),
  getters: {
    content: (state) => state.contentAvg
  },
  actions: {
    setContentAvg(value) {
      this.contentAvg = value
    }
  }
})
