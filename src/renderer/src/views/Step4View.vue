<template>
  <NavBar
    title="步骤四"
    sub-title="计算回收率引入的不确定度和测量重复性引入的不确定度"
    pre-path="/step3"
    next-path="/step5"
  />

  <div class="flex flex-1 pl-2 pr-2">
    <div class="left flex-1">
      <div class="title font-bold text-lg mb-2">
        回收率引入的不确定度 <vue-latex expression="u_{r}(R_{ec})" />
      </div>
      <div class="content">
        <div class="input-group">
          <div class="label">加标回收率</div>
          <div>
            <el-tag
              v-for="(tag, index) in dynamicTags"
              :key="index"
              class="ml-2 mb-2"
              closable
              :disable-transition="false"
              @close="tagHandleClose(index)"
            >
              {{ tag }} %</el-tag
            >
            <el-input
              v-if="inputVisible"
              ref="InputRef"
              v-model="inputValue"
              size="small"
              class="ml-2"
              style="width: 5rem"
              @keyup.enter="handleInputConfirm"
              @blur="handleInputConfirm"
            >
              <template #suffix>
                <span>%</span>
              </template>
            </el-input>
            <el-button v-else class="ml-2" size="small" @click="showInput">+ 添加</el-button>
          </div>
        </div>
        <div class="input-group">
          <div class="label">
            <span
              >最佳估计值 <vue-latex class="mr-2" expression="\bar{X}_{Rec} = " /><span
                class="text-red-500"
                >{{ zuiJiaGuJiZhi }} %</span
              ></span
            >
          </div>
        </div>
        <div class="input-group">
          <div class="label">
            <span
              >回收率试验的标准偏差 <vue-latex class="mr-2" expression="s(R_{ec}) = " />
              <span class="text-red-500">{{ biaoZhunPianCha }} %</span></span
            >
          </div>
        </div>
        <div class="input-group">
          <div class="label">
            <span
              >回收率所产生的标准不确定度 <vue-latex class="mr-2" expression="u(R_{ec}) = " />
              <span class="text-red-500">{{ biaoZhunBuQueDingDu }} %</span></span
            >
          </div>
        </div>
        <div class="input-group">
          <div class="label">
            <span
              >回收率所产生的相对标准不确定度
              <vue-latex class="mr-2" expression="u_{r}(R_{ec}) = " />
              <span class="text-red-500">{{ xiangDuiBiaoZhunBuQueDingDu }}</span></span
            >
          </div>
        </div>
        <div class="control flex mt-2 mb-2">
          <button class="btn btn-success text-white btn-sm mr-2" @click="calculate">计算</button>
        </div>
      </div>
    </div>
    <div class="right flex-1">
      <div class="left flex-1">
        <div class="title font-bold text-lg mb-2">
          测量重复性引入度不确定度 <vue-latex expression="u_{r}(R_{ep})" />
        </div>
        <div class="input-group">
          <div class="label">金属元素含量</div>
          <div>
            <el-tag
              v-for="(tag, index) in dynamicTags1"
              :key="index"
              class="ml-2"
              closable
              :disable-transition="false"
              @close="tagHandleClose1(index)"
            >
              {{ tag }} <vue-latex class="ml-1" expression="mg \cdot kg^{-1}" :fontsize="12"
            /></el-tag>
            <el-input
              v-if="inputVisible1"
              ref="InputRef1"
              v-model="inputValue1"
              size="small"
              class="ml-2"
              style="width: 8rem"
              @keyup.enter="handleInputConfirm1"
              @blur="handleInputConfirm1"
            >
              <template #suffix>
                <span> <vue-latex expression="mg \cdot kg^{-1}" :fontsize="12" /></span>
              </template>
            </el-input>
            <el-button v-else class="ml-2" size="small" @click="showInput1">+ 添加</el-button>
          </div>
          <div class="input-group mt-2">
            <div class="label">
              <span
                >最佳估计值 <vue-latex class="mr-2" expression="\bar{X}_{Rep} = " /><span
                  class="text-red-500"
                  >{{ zuiJiaGuJiZhi1 }} <vue-latex class="ml-1" expression="mg/kg" /></span
              ></span>
            </div>
          </div>
          <div class="input-group">
            <div class="label">
              <span
                >重复性试验偏差 <vue-latex class="mr-2" expression="s(R_{ep}) = " />
                <span class="text-red-500"
                  >{{ biaoZhunPianCha1 }} <vue-latex class="ml-1" expression="mg/kg" /></span
              ></span>
            </div>
          </div>
          <div class="input-group">
            <div class="label">
              <span
                >重复性所产生的标准不确定度 <vue-latex class="mr-2" expression="u(R_{ep}) = " />
                <span class="text-red-500"
                  >{{ biaoZhunBuQueDingDu1 }} <vue-latex class="ml-1" expression="mg/kg" /></span
              ></span>
            </div>
          </div>
          <div class="input-group">
            <div class="label">
              <span
                >重复性所产生的相对标准不确定度
                <vue-latex class="mr-2" expression="u_{r}(R_{ep}) = " />
                <span class="text-red-500">{{ xiangDuiBiaoZhunBuQueDingDu1 }}</span></span
              >
            </div>
          </div>
          <div class="control flex mt-2 mb-2">
            <button class="btn btn-success text-white btn-sm mr-2" @click="calculate1">计算</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BigNumber from 'bignumber.js'
import { useContentStore } from '../stores/content'

export default {
  setup() {
    const contentStore = useContentStore()

    return { contentStore }
  },
  data() {
    return {
      zuiJiaGuJiZhi: '0',
      dynamicTags: ['87.88', '87.82', '90.89', '92.21', '90.77', '95.09'],
      dynamicTags1: [],
      inputVisible: false,
      inputVisible1: false,
      inputValue: '',
      inputValue1: '',
      biaoZhunPianCha: '0',
      biaoZhunBuQueDingDu: '0',
      xiangDuiBiaoZhunBuQueDingDu: '0',
      zuiJiaGuJiZhi1: '0',
      biaoZhunPianCha1: '0',
      biaoZhunBuQueDingDu1: '0',
      xiangDuiBiaoZhunBuQueDingDu1: '0'
    }
  },
  watch: {
    $route(to, from) {
      if (to.name == 'step4' || from.name == 'step4') {
        this.dynamicTags1 = this.contentStore.nr
      }
    }
  },
  mounted() {
    this.dynamicTags1 = this.contentStore.nr
  },
  methods: {
    tagHandleClose(index) {
      this.dynamicTags.splice(index, 1)
    },
    tagHandleClose1(index) {
      this.dynamicTags1.splice(index, 1)
    },
    handleInputConfirm() {
      if (this.inputValue) {
        this.dynamicTags.push(this.inputValue)
      }

      this.inputVisible = false
      this.inputValue = ''
    },
    handleInputConfirm1() {
      if (this.inputValue1) {
        this.dynamicTags1.push(this.inputValue1)
      }

      this.inputVisible1 = false
      this.inputValue1 = ''
    },
    showInput() {
      this.inputVisible = true
      this.$nextTick(() => {
        this.$refs.InputRef.focus()
      })
    },
    showInput1() {
      this.inputVisible1 = true
      this.$nextTick(() => {
        this.$refs.InputRef1.focus()
      })
    },
    calculate() {
      if (this.dynamicTags.length == 0) return

      // 计算最佳估计值
      let sum = BigNumber(0)
      this.dynamicTags.forEach((item) => {
        sum = sum.plus(BigNumber(item))
      })

      this.zuiJiaGuJiZhi = sum.div(BigNumber(this.dynamicTags.length)).toFixed(2)

      // 计算标准偏差
      sum = BigNumber(0)
      this.dynamicTags.forEach((item) => {
        let step = BigNumber(item).minus(BigNumber(this.zuiJiaGuJiZhi)).pow(2)
        sum = sum.plus(step)
      })

      this.biaoZhunPianCha = BigNumber(1)
        .div(BigNumber(this.dynamicTags.length).minus(BigNumber(1)))
        .times(sum)
        .sqrt()
        .toFixed(2)

      // 计算标准不确定度
      this.biaoZhunBuQueDingDu = BigNumber(this.biaoZhunPianCha)
        .div(BigNumber(this.dynamicTags.length).sqrt())
        .toFixed(2)

      // 计算相对标准不确定度
      this.xiangDuiBiaoZhunBuQueDingDu = BigNumber(this.biaoZhunBuQueDingDu)
        .div(BigNumber(this.zuiJiaGuJiZhi))
        .toFixed(5)
    },
    calculate1() {
      if (this.dynamicTags1.length == 0) return

      // 计算最佳估计值
      let sum = BigNumber(0)
      this.dynamicTags1.forEach((item) => {
        sum = sum.plus(BigNumber(item))
      })

      this.zuiJiaGuJiZhi1 = sum.div(BigNumber(this.dynamicTags1.length)).toFixed(3)

      // 计算标准偏差
      sum = BigNumber(0)
      this.dynamicTags1.forEach((item) => {
        let step = BigNumber(item).minus(BigNumber(this.zuiJiaGuJiZhi1)).pow(2)
        sum = sum.plus(step)
      })

      this.biaoZhunPianCha1 = BigNumber(1)
        .div(BigNumber(this.dynamicTags1.length).minus(BigNumber(1)))
        .times(sum)
        .sqrt()
        .toFixed(5)

      // 计算标准不确定度
      this.biaoZhunBuQueDingDu1 = BigNumber(this.biaoZhunPianCha1)
        .div(BigNumber(this.dynamicTags1.length).sqrt())
        .toFixed(5)

      // 计算相对标准不确定度
      this.xiangDuiBiaoZhunBuQueDingDu1 = BigNumber(this.biaoZhunBuQueDingDu1)
        .div(BigNumber(this.zuiJiaGuJiZhi1))
        .toFixed(5)
    }
  }
}
</script>

<style lang="scss" scoped></style>
