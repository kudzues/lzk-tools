import { defineStore } from 'pinia'

export const useContentStore = defineStore('content', {
  state: () => ({ content: [] }),
  getters: {
    nr: (state) => state.content
  },
  actions: {
    setContent(value) {
      this.content = value
    }
  }
})
