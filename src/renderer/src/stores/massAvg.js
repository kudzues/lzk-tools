import { defineStore } from 'pinia'
import BigNumber from 'bignumber.js'

export const useMassAvgStore = defineStore('massAvg', {
  state: () => ({ massAvg: BigNumber(0) }),
  getters: {
    bn: (state) => state.massAvg.times(1000)
  },
  actions: {
    setMassAvg(value) {
      this.massAvg = BigNumber(value)
    }
  }
})
