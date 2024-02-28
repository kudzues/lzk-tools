import { defineStore } from 'pinia'
import BigNumber from 'bignumber.js'

export const useConcentrationAvgStore = defineStore('concentrationAvg', {
  state: () => ({ concentrationAvg: BigNumber(0) }),
  getters: {
    bn: (state) => state.concentrationAvg
  },
  actions: {
    setConcentrationAvg(value) {
      this.concentrationAvg = BigNumber(value)
    }
  }
})
