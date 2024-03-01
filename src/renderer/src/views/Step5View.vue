<template>
  <NavBar title="步骤五" sub-title="计算合成标准不确定度和扩展不确定度" pre-path="/step4" />
  <div class="flex flex-1 pl-2 pr-2">
    <div class="left flex-1">
      <div class="title font-bold text-lg mb-2">合成标准不确定度</div>
      <div class="content">
        <div class="flex mt-2 mb-2 items-center w-full">
          <span><vue-latex class="ml-2" expression="u_{r}(m) = " /></span>
          <input
            v-model="urm"
            class="bg-transparent p-2 border-b placeholder:text-sm"
            type="text"
          />
        </div>
        <div class="flex mt-2 mb-2 items-center w-full">
          <span><vue-latex class="ml-2" expression="u_{r}(V) = " /></span>
          <input
            v-model="urv"
            class="bg-transparent p-2 border-b placeholder:text-sm"
            type="text"
          />
        </div>
        <div class="flex mt-2 mb-2 items-center w-full">
          <span><vue-latex class="ml-2" expression="u_{r}(R_{ec}) = " /></span>
          <input
            v-model="urrec"
            class="bg-transparent p-2 border-b placeholder:text-sm"
            type="text"
          />
        </div>
        <div class="flex mt-2 mb-2 items-center w-full">
          <span><vue-latex class="ml-2" expression="u_{r}(R_{ep}) = " /></span>
          <input
            v-model="urrep"
            class="bg-transparent p-2 border-b placeholder:text-sm"
            type="text"
          />
        </div>
        <div class="input-group">
          <div class="label">
            <span
              ><vue-latex class="mr-2" expression="u_{er} = " />
              <span class="text-red-500">{{ ucr }} </span></span
            >
          </div>
        </div>
        <div class="flex mt-2 mb-2 items-center w-full">
          <span>金属元素的平均含量<vue-latex class="ml-2" expression="X = " /></span>
          <input
            v-model="contentAvg"
            class="bg-transparent p-2 border-b placeholder:text-sm"
            type="text"
          />
        </div>
        <div class="input-group">
          <div class="label">
            <span
              >合成标准不确定度<vue-latex class="mr-2" expression="u_{c}(X) = " />
              <span class="text-red-500">{{ ucx }} <vue-latex expression="mg/kg" /></span>
            </span>
          </div>
        </div>

        <div class="control flex mt-2 mb-2">
          <button class="btn btn-success text-white btn-sm mr-2" @click="calculate">计算</button>
        </div>
      </div>
    </div>
    <div class="right flex-1">
      <div class="title font-bold text-lg mb-2">拓展不确定度</div>
      <div class="flex mt-2 mb-2 items-center w-full">
        <span>包含因子<vue-latex class="ml-2" expression="k = " /></span>
        <input v-model="bhyz" class="bg-transparent p-2 border-b placeholder:text-sm" type="text" />
      </div>
      <div class="flex mt-2 mb-2 items-center w-full">
        <span>合成标准不确定度<vue-latex class="ml-2" expression="u_{c}(X) = " /></span>
        <input v-model="ucx1" class="bg-transparent p-2 border-b placeholder:text-sm" type="text" />
      </div>
      <div class="input-group">
        <div class="label">
          <span
            >拓展不确定度<vue-latex class="ml-1 mr-1" expression="U = " />
            <span class="text-red-500"
              >{{ kucx }} <vue-latex class="ml-2" expression="mg/kg" /> </span
          ></span>
        </div>
      </div>
      <div class="content">
        <div class="control flex mt-2 mb-2">
          <button class="btn btn-success text-white btn-sm mr-2" @click="calculate1">计算</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useContentAvgStore } from '../stores/contentAvg'
import BigNumber from 'bignumber.js'
export default {
  setup() {
    const contentAvgStore = useContentAvgStore()

    return { contentAvgStore }
  },
  data() {
    return {
      urm: '0.00134',
      urv: '0.000564',
      urp: '0.01365',
      urrec: '0.01245',
      urrep: '0.00584',
      ucr: '0',
      ucx: '0',
      ucx1: '0',
      contentAvg: '0',
      bhyz: '2',
      kucx: '0'
    }
  },
  watch: {
    $route(to, from) {
      if (to.name == 'step5' || from.name == 'step5') {
        this.contentAvg = this.contentAvgStore.content
      }
    }
  },
  methods: {
    calculate() {
      this.ucr = BigNumber(this.urm)
        .pow(2)
        .plus(BigNumber(this.urv).pow(2))
        .plus(BigNumber(this.urp).pow(2))
        .plus(BigNumber(this.urrec).pow(2))
        .plus(BigNumber(this.urrep).pow(2))
        .sqrt()
        .toFixed(5)

      this.ucx1 = this.ucx = BigNumber(this.contentAvg).times(BigNumber(this.ucr)).toFixed(5)
    },

    calculate1() {
      this.kucx = BigNumber(this.bhyz).times(BigNumber(this.ucx1)).toFixed(5)
    }
  }
}
</script>

<style lang="scss" scoped></style>
