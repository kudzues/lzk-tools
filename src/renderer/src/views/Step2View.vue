<template>
  <NavBar title="步骤二" sub-title="测量不确定度分量的量化" pre-path="/" next-path="/step3" />

  <div class="flex-1 overflow-x-hidden pl-2 pr-2">
    <div class="flex flex-wrap">
      <div class="w-1/3 px-1">
        <!-- 第一列内容 -->
        <div class="p-2 mb-4 border">
          <div class="text-lg font-bold">样品称量过程引入的相对标准不确定度</div>
          <div>
            <div class="flex gap-2 items-center mt-2 mb-2">
              <span class="text-base font-medium">最大误差：</span>
              <vue-latex expression="\pm" :fontsize="12" />
              <input
                v-model="step1.wuCha"
                class="flex-1 bg-transparent p-2 border-b placeholder:text-sm"
                type="text"
                placeholder="最大允许误差"
              />
              <vue-latex expression="mg" :fontsize="12" />
            </div>
            <div class="flex gap-2 items-center mt-2 mb-2">
              <span class="text-base font-medium">计算次数：</span>
              <input
                v-model="step1.ciShu"
                class="flex-1 bg-transparent p-2 border-b placeholder:text-sm"
                type="text"
                placeholder="不确定度分量需要计算的次数"
              />
            </div>
            <div class="flex gap-2 items-center mt-2 mb-2">
              <span class="text-base font-medium">包含因子：</span>
              <input
                v-model="step1.yinZi"
                class="flex-1 bg-transparent p-2 border-b placeholder:text-sm"
                type="text"
                placeholder="填具体数值，例 1.73205 即 √3 "
              />
            </div>
            <div class="flex gap-2 items-center mt-2 mb-2">
              <span class="text-base font-medium">平均质量：</span>
              <input
                v-model="step1.zhiLiang"
                class="flex-1 bg-transparent p-2 border-b placeholder:text-sm"
                type="text"
                placeholder="平均质量"
              />
              <vue-latex expression="mg" :fontsize="12" />
            </div>
            <div class="gap-2 items-center mt-2 mb-2">
              <span class="text-base font-medium">计算结果：</span>
              <span class="text-red-600">{{ step1.result }}</span>
            </div>
            <div class="flex justify-center items-center">
              <button class="btn btn-success text-white btn-sm" @click="calculate1">
                数据计算
              </button>
            </div>
          </div>
        </div>
        <div class="p-2 mb-4 border">
          <div class="text-lg font-bold">
            样品消解液定容过程引入的不确定分量 <vue-latex expression="u_{r}(V) " :fontsize="12" />
          </div>
          <div>
            <div class="flex gap-2 items-center mt-2 mb-2">
              <span class="text-base font-medium">选择容器：</span>
              <select
                v-model="rongQiOption1"
                class="flex-1 bg-transparent p-2 border-b"
                @change="changeRongQi1"
              >
                <option value="10">10</option>
                <option value="25">25</option>
                <option value="50">50</option>
                <option value="100">100</option>
              </select>
              <vue-latex expression="mL" :fontsize="12" />
            </div>
            <div class="flex flex-col gap-2 items-center mt-2 mb-2">
              <div class="w-full">
                <span class="text-base font-medium">容量瓶校准所产生的标准不确定度：</span>
              </div>
              <div class="flex items-center w-full">
                <input
                  v-model="step4.rongLiangPingBuQueDingDu"
                  class="flex-1 bg-transparent p-2 border-b placeholder:text-sm"
                  type="text"
                  placeholder="容量瓶校准所产生的标准不确定度"
                />
                <vue-latex expression="mL" :fontsize="12" />
              </div>
            </div>
            <div class="flex flex-col gap-2 items-center mt-2 mb-2">
              <div class="w-full">
                <span class="text-base font-medium">温度效应所产生的标准不确定度：</span>
              </div>
              <div class="flex items-center w-full">
                <input
                  v-model="step4.wenDuBuQueDingDu"
                  class="flex-1 bg-transparent p-2 border-b placeholder:text-sm"
                  type="text"
                  placeholder="温度效应所产生的标准不确定度"
                />
                <vue-latex expression="mL" :fontsize="12" />
              </div>
            </div>

            <div class="gap-2 items-center mt-2 mb-2">
              <span class="text-base font-medium">计算结果：</span>
              <span class="text-red-600"
                >{{ step4.result }}
                <vue-latex v-show="step4.result != '参数错误'" expression="mL" :fontsize="12"
              /></span>
            </div>
            <div class="gap-2 items-center mt-2 mb-2">
              <span class="text-base font-medium">其相对标准不确定度：</span>
              <span class="text-red-600">{{ step4.result1 }}</span>
            </div>
            <div class="flex justify-center items-center">
              <button class="btn btn-success text-white btn-sm" @click="calculate4">
                数据计算
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="w-1/3 px-1">
        <!-- 第二列内容 -->
        <div class="p-2 mb-4 border">
          <div class="text-lg font-bold">
            容量瓶校准所产生的标准不确定度 <vue-latex expression="u_{r}(m) " :fontsize="12" />
          </div>
          <div>
            <div class="flex gap-2 items-center mt-2 mb-2">
              <span class="text-base font-medium">选择容器：</span>
              <select
                v-model="rongQiOption"
                class="flex-1 bg-transparent p-2 border-b"
                @change="changeRongQi"
              >
                <option value="0.02">10</option>
                <option value="0.03">25</option>
                <option value="0.05">50</option>
                <option value="0.1">100</option>
              </select>
              <vue-latex expression="mL" :fontsize="12" />
            </div>
            <div class="flex gap-2 items-center mt-2 mb-2">
              <span class="text-base font-medium">容量允差：</span>
              <vue-latex expression="\pm" :fontsize="12" />
              <input
                v-model="step2.yunCha"
                class="flex-1 bg-transparent p-2 border-b placeholder:text-sm"
                type="text"
                placeholder="容量允差"
              />
              <vue-latex expression="mL" :fontsize="12" />
            </div>
            <div class="flex gap-2 items-center mt-2 mb-2">
              <span class="text-base font-medium">包含因子：</span>
              <input
                v-model="step2.yinZi"
                class="flex-1 bg-transparent p-2 border-b placeholder:text-sm"
                type="text"
                placeholder="填具体数值，例 2.44948 即 √6"
              />
            </div>
            <div class="gap-2 items-center mt-2 mb-2">
              <span class="text-base font-medium">计算结果：</span>
              <span class="text-red-600"
                >{{ step2.result }}
                <vue-latex v-show="step2.result != '参数错误'" expression="mL" :fontsize="12"
              /></span>
            </div>
            <div class="flex justify-center items-center">
              <button class="btn btn-success text-white btn-sm" @click="calculate2">
                数据计算
              </button>
            </div>
          </div>
        </div>
        <div class="p-2 mb-4 border">
          <div class="text-lg font-bold">
            标准工作容液配置引入的不确定度
            <vue-latex expression="u_{r}(\rho _{1}) " :fontsize="12" />
          </div>
          <div>
            <div class="flex flex-col gap-2 items-center mt-2 mb-2">
              <div class="w-full">
                <span class="text-base font-medium">依据证书其相对拓展不确定度：</span>
              </div>
              <div class="flex items-center w-full">
                <input
                  v-model="step5.step1.buQueDingDu"
                  class="flex-1 bg-transparent p-2 border-b placeholder:text-sm"
                  type="text"
                  placeholder="依据证书其相对拓展不确定度"
                />
                <vue-latex expression="\%" :fontsize="12" />
              </div>
            </div>
            <div class="flex gap-2 items-center mt-2 mb-2">
              <span class="text-base font-medium">包含因子：</span>
              <input
                v-model="step5.step1.yinZi"
                class="flex-1 bg-transparent p-2 border-b placeholder:text-sm"
                type="text"
                placeholder="包含因子"
              />
            </div>
            <div class="gap-2 items-center mt-2 mb-2">
              <vue-latex expression="u_{r}(标_{1})=" />
              <span class="text-red-600 ml-1">{{ step5.step1.result }}</span>
            </div>
            <div class="flex justify-center items-center">
              <button class="btn btn-success text-white btn-sm" @click="calculate5">
                数据计算
              </button>
            </div>
            <div class="flex flex-col gap-2 items-center mt-2 mb-2">
              <div class="w-full">
                <span class="text-base font-medium">容量瓶定容所产生的相对标准不确定度：</span>
              </div>
              <div class="flex items-center w-full">
                <input
                  v-model="step5.step2.rongLiangPingBuQueDingDu"
                  class="flex-1 bg-transparent p-2 border-b placeholder:text-sm"
                  type="text"
                  placeholder="容量瓶定容所产生的相对标准不确定度"
                />
              </div>
            </div>
            <div class="flex flex-col gap-2 items-center mt-2 mb-2">
              <div class="w-full">
                <span class="text-base font-medium">移液器相对标准不确定度：</span>
              </div>
              <div class="flex items-center w-full">
                <input
                  v-model="step5.step2.xiangDuiBiaoZhunBuQueDingDu"
                  class="flex-1 bg-transparent p-2 border-b placeholder:text-sm"
                  type="text"
                  placeholder="相对标准不确定度"
                />
              </div>
            </div>
            <div class="gap-2 items-center mt-2 mb-2">
              <vue-latex expression="u_{r} (c)=" />
              <span class="text-red-600 ml-1">{{ step5.step2.result }}</span>
            </div>
            <div class="flex justify-center items-center">
              <button class="btn btn-success text-white btn-sm" @click="calculate6">
                数据计算
              </button>
            </div>
            <div class="flex gap-2 items-center mt-2 mb-2">
              <vue-latex expression="u_{r} (c_{1中} )" />
              <input
                v-model="step5.step3.c1"
                class="flex-1 bg-transparent p-2 border-b placeholder:text-sm"
                type="text"
              />
            </div>
            <div class="flex gap-2 items-center mt-2 mb-2">
              <vue-latex expression="u_{r} (c_{2中} )" />
              <input
                v-model="step5.step3.c2"
                class="flex-1 bg-transparent p-2 border-b placeholder:text-sm"
                type="text"
              />
            </div>
            <div class="flex gap-2 items-center mt-2 mb-2">
              <vue-latex expression="u_{r} (c_{工} )" />
              <input
                v-model="step5.step3.c3"
                class="flex-1 bg-transparent p-2 border-b placeholder:text-sm"
                type="text"
              />
            </div>
            <div class="gap-2 items-center mt-2 mb-2">
              <vue-latex expression="u_{r} (标_{2})=" />
              <span class="text-red-600 ml-1">{{ step5.step3.result }}</span>
            </div>
            <div class="flex justify-center items-center">
              <button class="btn btn-success text-white btn-sm" @click="calculate7">
                数据计算
              </button>
            </div>

            <div class="flex gap-2 items-center mt-2 mb-2">
              <vue-latex expression="u_{r} (标_{1} )" />
              <input
                v-model="step5.step4.b1"
                class="flex-1 bg-transparent p-2 border-b placeholder:text-sm"
                type="text"
              />
            </div>
            <div class="flex gap-2 items-center mt-2 mb-2">
              <vue-latex expression="u_{r} (标_{2} )" />
              <input
                v-model="step5.step4.b2"
                class="flex-1 bg-transparent p-2 border-b placeholder:text-sm"
                type="text"
              />
            </div>
            <div class="gap-2 items-center mt-2 mb-2">
              <vue-latex expression="u_{r}(\rho _{1}) = " />
              <span class="text-red-600 ml-1">{{ step5.step4.result }}</span>
            </div>
            <div class="flex justify-center items-center">
              <button class="btn btn-success text-white btn-sm" @click="calculate8">
                数据计算
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="w-1/3 px-1">
        <!-- 第三列内容 -->
        <div class="p-2 mb-4 border">
          <div class="text-lg font-bold">温度效应所产生的标准不确定度</div>
          <div>
            <div class="flex gap-2 items-center mt-2 mb-2">
              <span class="text-base font-medium">选择容器：</span>
              <select
                v-model="rongQiOption1"
                class="flex-1 bg-transparent p-2 border-b"
                @change="changeRongQi1"
              >
                <option value="10">10</option>
                <option value="25">25</option>
                <option value="50">50</option>
                <option value="100">100</option>
              </select>
              <vue-latex expression="mL" :fontsize="12" />
            </div>
            <div class="flex gap-2 items-center mt-2 mb-2">
              <span class="text-base font-medium">校准温度：</span>
              <input
                v-model="step3.biaoZhunWenDu"
                class="flex-1 bg-transparent p-2 border-b placeholder:text-sm"
                type="text"
                placeholder="校准合格的温度"
              />
              <vue-latex expression="^{\circ}C" :fontsize="12" />
            </div>
            <div class="flex gap-2 items-center mt-2 mb-2">
              <span class="text-base font-medium">实际室度：</span>
              <input
                v-model="step3.shiJiWenDu"
                class="flex-1 bg-transparent p-2 border-b placeholder:text-sm"
                type="text"
                placeholder="实际定容时的室温"
              />
              <vue-latex expression="^{\circ}C" :fontsize="12" />
            </div>
            <div class="flex gap-2 items-center mt-2 mb-2">
              <span class="text-base font-medium">包含因子：</span>
              <input
                v-model="step3.yinZi"
                class="flex-1 bg-transparent p-2 border-b placeholder:text-sm"
                type="text"
                placeholder="填具体数值，例 1.73205 即 √3 "
              />
            </div>
            <div class="gap-2 items-center mt-2 mb-2">
              <span class="text-base font-medium">体积变化区间：</span>
              <span class="text-red-600">
                <vue-latex v-show="step3.result1 != '参数错误'" expression="\pm" :fontsize="12" />
                {{ step3.result1 }}
                <vue-latex v-show="step3.result1 != '参数错误'" expression="mL" :fontsize="12"
              /></span>
            </div>
            <div class="gap-2 items-center mt-2 mb-2">
              <span class="text-base font-medium">计算结果：</span>
              <span class="text-red-600"
                >{{ step3.result }}
                <vue-latex v-show="step3.result != '参数错误'" expression="mL" :fontsize="12"
              /></span>
            </div>
            <div class="flex justify-center items-center">
              <button class="btn btn-success text-white btn-sm" @click="calculate3">
                数据计算
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BigNumber from 'bignumber.js'
import NavBar from '../components/common/NavBar.vue'
import { useMassAvgStore } from '../stores/massAvg'
export default {
  components: {
    NavBar
  },
  setup() {
    const massAvgStore = useMassAvgStore()

    return { massAvgStore }
  },
  data() {
    return {
      rongQiOption: '0.03',
      rongQiOption1: '25',
      step1: {
        wuCha: BigNumber('0.5'),
        ciShu: BigNumber('2'),
        yinZi: BigNumber('1.73205'),
        zhiLiang: BigNumber('304.5'),
        result: BigNumber('0.00000')
      },
      step2: {
        yunCha: BigNumber('0.03'),
        yinZi: BigNumber('2.44948'),
        result: BigNumber('0.00000')
      },
      step3: {
        biaoZhunWenDu: BigNumber('22.7'),
        shiJiWenDu: BigNumber('25'),
        yinZi: BigNumber('1.73205'),
        result: BigNumber('0.00000'),
        result1: BigNumber('0.00000')
      },
      step4: {
        rongLiangPingBuQueDingDu: BigNumber('0.01225'),
        wenDuBuQueDingDu: BigNumber('0.00697'),
        result: BigNumber('0.00000'),
        result1: BigNumber('0.00000')
      },
      step5: {
        step1: {
          buQueDingDu: BigNumber('0.7'),
          yinZi: BigNumber('2'),
          result: BigNumber('0.0000')
        },
        step2: {
          rongLiangPingBuQueDingDu: BigNumber('0.000494'),
          xiangDuiBiaoZhunBuQueDingDu: BigNumber('0.00577'),
          result: BigNumber('0.0000')
        },
        step3: {
          c1: BigNumber('0.00579'),
          c2: BigNumber('0.00579'),
          c3: BigNumber('0.00580'),
          result: BigNumber('0.0000')
        },
        step4: {
          b1: BigNumber('0.0035'),
          b2: BigNumber('0.01003'),

          result: BigNumber('0.0000')
        }
      }
    }
  },
  watch: {
    $route(to) {
      if (to.name == 'step2') {
        this.step1.zhiLiang = this.massAvgStore.bn
      }
    }
  },

  methods: {
    calculate1() {
      let isNaN = this.setData(this.step1)

      if (isNaN) {
        this.step1.result = '参数错误'
      } else {
        const { wuCha, ciShu, yinZi, zhiLiang } = this.step1
        let result = wuCha.div(yinZi).pow(2).times(ciShu).sqrt().div(zhiLiang)
        console.log('[ result.isFinite() ] >', result.isFinite())
        this.step1.result = result.isFinite() ? result.toFixed(5) : '参数错误'
      }
    },
    calculate2() {
      let isNaN = this.setData(this.step2)

      if (isNaN) {
        this.step2.result = '参数错误'
      } else {
        const { yunCha, yinZi } = this.step2
        let result = yunCha.div(yinZi)
        this.step2.result = result.isFinite() ? result.toFixed(5) : '参数错误'
        this.step4.rongLiangPingBuQueDingDu = BigNumber(this.step2.result)
      }
    },
    calculate3() {
      let isNaN = this.setData(this.step3)

      if (isNaN) {
        this.step3.result = '参数错误'
        this.step3.result1 = '参数错误'
      } else {
        const { biaoZhunWenDu, shiJiWenDu, yinZi } = this.step3
        let boDong = shiJiWenDu.minus(biaoZhunWenDu)
        let result = BigNumber(10).pow(-4).times('2.1').times(boDong).times(this.rongQiOption1)
        this.step3.result1 = result.isFinite() ? result.toFixed(5) : '参数错误'
        result = result.div(yinZi)
        this.step3.result = result.isFinite() ? result.toFixed(5) : '参数错误'

        this.step4.wenDuBuQueDingDu = BigNumber(this.step3.result)
      }
    },
    calculate4() {
      let isNaN = this.setData(this.step4)

      if (isNaN) {
        this.step4.result = '参数错误'
        this.step4.result1 = '参数错误'
      } else {
        const { rongLiangPingBuQueDingDu, wenDuBuQueDingDu } = this.step4

        let result = rongLiangPingBuQueDingDu.pow(2).plus(wenDuBuQueDingDu.pow(2)).sqrt()
        this.step4.result = result.isFinite() ? result.toFixed(5) : '参数错误'

        result = result.div(this.rongQiOption1)

        this.step4.result1 = result.isFinite() ? result.toFixed(6) : '参数错误'
        this.step5.step2.rongLiangPingBuQueDingDu = this.step4.result1
      }
    },
    calculate5() {
      let isNaN = this.setData(this.step5.step1)

      if (isNaN) {
        this.step5.step1.result = '参数错误'
      } else {
        const { buQueDingDu, yinZi } = this.step5.step1

        let result = buQueDingDu.div(100).div(yinZi)
        this.step5.step4.b1 = this.step5.step1.result = result.isFinite()
          ? result.toFixed(4)
          : '参数错误'
      }
    },
    calculate6() {
      let isNaN = this.setData(this.step5.step2)

      if (isNaN) {
        this.step5.step2.result = '参数错误'
      } else {
        const { rongLiangPingBuQueDingDu, xiangDuiBiaoZhunBuQueDingDu } = this.step5.step2

        let result = rongLiangPingBuQueDingDu.pow(2).plus(xiangDuiBiaoZhunBuQueDingDu.pow(2)).sqrt()
        this.step5.step2.result = result.isFinite() ? result.toFixed(5) : '参数错误'
      }
    },
    calculate7() {
      let isNaN = this.setData(this.step5.step3)

      if (isNaN) {
        this.step5.step3.result = '参数错误'
      } else {
        const { c1, c2, c3 } = this.step5.step3

        let result = c1.pow(2).plus(c2.pow(2)).plus(c3.pow(2)).sqrt()
        this.step5.step4.b2 = this.step5.step3.result = result.isFinite()
          ? result.toFixed(5)
          : '参数错误'
      }
    },
    calculate8() {
      let isNaN = this.setData(this.step5.step4)

      if (isNaN) {
        this.step5.step4.result = '参数错误'
      } else {
        const { b1, b2 } = this.step5.step4

        let result = b1.pow(2).plus(b2.pow(2)).sqrt()
        this.step5.step4.result = result.isFinite() ? result.toFixed(5) : '参数错误'
      }
    },
    changeRongQi() {
      this.step2.yunCha = BigNumber(this.rongQiOption)
      switch (this.rongQiOption) {
        case '0.02':
          this.rongQiOption1 = 10
          break
        case '0.03':
          this.rongQiOption1 = 25
          break
        case '0.05':
          this.rongQiOption1 = 50
          break
        case '0.1':
          this.rongQiOption1 = 100
          break
      }
    },
    changeRongQi1() {
      switch (this.rongQiOption1) {
        case '10':
          this.step2.yunCha = BigNumber((this.rongQiOption = '0.02'))
          break
        case '25':
          this.step2.yunCha = BigNumber((this.rongQiOption = '0.03'))
          break
        case '50':
          this.step2.yunCha = BigNumber((this.rongQiOption = '0.05'))
          break
        case '100':
          this.step2.yunCha = BigNumber((this.rongQiOption = '0.1'))
          break
      }
    },
    setData(obj) {
      let isNaN = false
      for (let prop in obj) {
        if (prop.includes('result')) continue
        if (!BigNumber.isBigNumber(obj[prop])) {
          obj[prop] = BigNumber(obj[prop])
          isNaN = obj[prop].isNaN()
        }
      }

      return isNaN
    }
  }
}
</script>

<style lang="scss" scoped></style>
