import { defineStore } from 'pinia'

export const useCalculateStore = defineStore('calculate', {
  state: () => ({
    urm: '0',
    urv: '0',
    urp: '0'
  }),
  getters: {},
  actions: {}
})
