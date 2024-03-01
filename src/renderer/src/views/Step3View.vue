<template>
  <NavBar
    title="步骤三"
    sub-title="校准工作曲线拟合引入的不确定度"
    pre-path="/step2"
    next-path="/step4"
  />

  <div class="flex flex-1 pl-2 pr-2">
    <div class="left flex-1">
      <div class="control flex flex-row-reverse mt-2 mb-2">
        <button class="btn btn-success text-white btn-sm mr-2" @click="addTableData">
          添加数据
        </button>
      </div>
      <div class="overflow-x-hidden h-64 border">
        <table class="table table-md table-pin-rows">
          <thead>
            <tr>
              <th>标准溶液浓度/<vue-latex expression="(\mu g \cdot L^{-1})" :fontsize="12" /></th>
              <th>测定吸光度1</th>
              <th>测定吸光度2</th>
              <th>测定吸光度3</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in tableDataList" :key="item.id">
              <td>{{ item.x.toString() }}</td>
              <td>{{ item.y1.toString() }}</td>
              <td>{{ item.y2.toString() }}</td>
              <td>{{ item.y3.toString() }}</td>
              <td>
                <button
                  class="btn btn-ghost btn-xs bg-success text-white mr-2"
                  @click="editData(index)"
                >
                  编辑
                </button>
                <el-popconfirm
                  title="是否删除该数据？"
                  confirm-button-text="删除"
                  cancel-button-text="取消"
                  confirm-button-type="danger"
                  :hide-icon="true"
                  width="200"
                  @confirm="deleteData(index)"
                >
                  <template #reference>
                    <button class="btn btn-ghost btn-xs text-red-400">删除</button>
                  </template>
                </el-popconfirm>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="info flex gap-2 justify-between">
        <div class="flex gap-2 mt-2 mb-2 items-center">
          <vue-latex expression="\rho " />
          <input
            v-model="concentrationAvg"
            class="mb-1 bg-transparent p-2 border-b"
            type="text"
            placeholder="金属元素的平均质量浓度"
          />
        </div>
        <div class="flex gap-2 mt-2 mb-2 items-center">
          <vue-latex expression="B_{1}" />
          <input
            v-model="slope"
            class="mb-1 bg-transparent p-2 border-b"
            type="text"
            placeholder="曲线斜率"
          />
        </div>
        <div class="flex gap-2 mt-2 mb-2 items-center">
          <vue-latex expression="B_{0}" />
          <input
            v-model="intercept"
            class="mb-1 bg-transparent p-2 border-b"
            type="text"
            placeholder="曲线截距"
          />
        </div>
      </div>
      <div class="info flex gap-2 justify-between">
        <div class="flex gap-2 mt-2 mb-2 items-center">
          <vue-latex expression="n" />
          <input
            v-model="n"
            class="mb-1 bg-transparent p-2 border-b"
            type="text"
            placeholder="测量校准溶液的次数"
          />
        </div>
        <div class="flex gap-2 mt-2 mb-2 items-center">
          <vue-latex expression="P" />
          <input
            v-model="p"
            class="mb-1 bg-transparent p-2 border-b"
            type="text"
            placeholder="测量样品溶液的次数"
          />
        </div>
        <div class="flex gap-2 mt-2 mb-2 items-center">
          <vue-latex expression="\bar{X}" />
          <input
            v-model="x"
            class="mb-1 bg-transparent p-2 border-b"
            type="text"
            placeholder="工作曲线各校准点浓度的平均值"
          />
        </div>
      </div>
    </div>

    <div class="right flex-1 ml-4">
      <div class="control flex mt-2 mb-2">
        <button class="btn btn-success text-white btn-sm mr-2" @click="calculate">计算</button>
      </div>
      <div class="info mt-4 text-red-500">
        <div>
          <vue-latex expression="S_{R} =" /> <span class="ml-2">{{ sr }}</span>
        </div>
        <div class="mt-2">
          <div>标准工作曲线拟合所产生的标准不确定度</div>
          <vue-latex expression="u(\rho_{2}) =" /> <span class="ml-2 mr-2">{{ up }}</span>
          <vue-latex expression="\mu g/L" />
        </div>
        <div class="mt-2">
          <span class="mr-2">相对标准不确定度</span>
          <vue-latex expression="u_{r}(\rho_{2}) =" /> <span class="ml-2 mr-2">{{ up2 }}</span>
        </div>
      </div>
      <div class="mt-4">
        <div class="font-bold">
          仪器校准引入的不确定度 <vue-latex expression="u_{r}(\rho_{3})" />
        </div>
        <div class="flex mt-2 mb-2 items-center w-full">
          <span>拓展不确定度：</span>
          <input
            v-model="tuoZhanBuQueDingDu"
            class="bg-transparent p-2 border-b placeholder:text-sm"
            type="text"
          />
          <vue-latex class="ml-2" expression="pg" />
        </div>
        <div class="flex mt-2 mb-2 items-center w-full">
          <span>包含因子 <vue-latex class="ml-2" expression="k = " /></span>
          <input
            v-model="baoHanYinZi"
            class="bg-transparent p-2 border-b placeholder:text-sm"
            type="text"
          />
        </div>
        <div class="flex mt-2 mb-2 items-center w-full">
          <span>进样量：</span>
          <input
            v-model="jinYangLiang"
            class="bg-transparent p-2 border-b placeholder:text-sm"
            type="text"
          />
          <vue-latex class="ml-2" expression="\mu L" />
        </div>
        <div class="control flex mt-2 mb-2">
          <button class="btn btn-success text-white btn-sm mr-2" @click="calculate1">计算</button>
        </div>
        <div class="info mt-4 text-red-500">
          <div>
            标准不确定度 <vue-latex class="ml-2" expression="u(\rho_{3}) = " /> {{ up3 }}
            <vue-latex class="ml-2" expression="\mu g/L" />
          </div>
          <div class="mt-2">
            相对标准不确定度 <vue-latex class="ml-2" expression="u_{r}(\rho_{3}) = " /> {{ urp3 }}
          </div>
        </div>
      </div>
      <div class="mt-4">
        <div class="font-bold">溶液质量浓度测定过程引入的相对标准不确定度</div>
        <div class="flex mt-2 mb-2 items-center w-full">
          <span><vue-latex class="mr-2" expression="u_{r}(\rho_{1}) = " /></span>
          <input
            v-model="urp11"
            class="bg-transparent p-2 border-b placeholder:text-sm"
            type="text"
          />
        </div>
        <div class="flex mt-2 mb-2 items-center w-full">
          <span><vue-latex class="mr-2" expression="u_{r}(\rho_{2}) = " /></span>
          <input
            v-model="urp22"
            class="bg-transparent p-2 border-b placeholder:text-sm"
            type="text"
          />
        </div>
        <div class="flex mt-2 mb-2 items-center w-full">
          <span><vue-latex class="mr-2" expression="u_{r}(\rho_{3}) = " /></span>
          <input
            v-model="urp33"
            class="bg-transparent p-2 border-b placeholder:text-sm"
            type="text"
          />
        </div>
        <div class="control flex mt-2 mb-2">
          <button class="btn btn-success text-white btn-sm mr-2" @click="calculate2">计算</button>
        </div>
        <div class="info mt-4 text-red-500">
          <div><vue-latex class="ml-2" expression="u_{r}(\rho) = " /> {{ urpp }}</div>
        </div>
      </div>
    </div>
  </div>

  <el-dialog
    v-model="dialogVisible"
    :title="isEditTableData ? '编辑' : '添加'"
    :close-on-click-modal="false"
    :draggable="true"
    width="400"
  >
    <el-form :model="form" label-position="top">
      <el-form-item label="标准溶液浓度">
        <el-input v-model="form.x" type="text" />
      </el-form-item>
      <el-form-item label="测定吸光度1">
        <el-input v-model="form.y1" type="text" />
      </el-form-item>
      <el-form-item label="测定吸光度2">
        <el-input v-model="form.y2" type="text" />
      </el-form-item>
      <el-form-item label="测定吸光度3">
        <el-input v-model="form.y3" type="text" />
      </el-form-item>
    </el-form>
    <template #footer>
      <button class="btn btn-success text-white btn-sm mr-2" @click="saveData">保存</button>
      <button class="btn text-black btn-sm" @click="dialogVisible = false">取消</button>
    </template>
  </el-dialog>
</template>

<script>
import BigNumber from 'bignumber.js'
import NavBar from '../components/common/NavBar.vue'
export default {
  components: {
    NavBar
  },
  data() {
    return {
      id: 0,
      tableDataList: [
        {
          id: 1,
          x: '0',
          y1: '0.002',
          y2: '0.001',
          y3: '0.0008'
        },
        {
          id: 2,
          x: '1',
          y1: '0.0562',
          y2: '0.0548',
          y3: '0.0587'
        },
        {
          id: 3,
          x: '2',
          y1: '0.1068',
          y2: '0.1059',
          y3: '0.1075'
        },
        {
          id: 4,
          x: '3',
          y1: '0.1577',
          y2: '0.1587',
          y3: '0.1619'
        },
        {
          id: 5,
          x: '4',
          y1: '0.2091',
          y2: '0.2102',
          y3: '0.2093'
        }
      ],
      dialogVisible: false,
      isEditTableData: false,
      form: {},
      itemIndex: 0,
      concentrationAvg: '2.458',
      slope: '0.05219',
      intercept: '0.00207',
      n: '15',
      p: '12',
      x: '2',
      sr: '0',
      up: '0',
      up2: '0',
      tuoZhanBuQueDingDu: '0.6',
      baoHanYinZi: '2',
      jinYangLiang: '20',
      up3: '0',
      urp3: '0',
      urp11: '0.01062',
      urp22: '0.00602',
      urp33: '0.00610',
      urpp: '0'
    }
  },
  methods: {
    addTableData() {
      this.form = {
        id: 0,
        x: 0,
        y1: 0,
        y2: 0,
        y3: 0
      }

      this.isEditTableData = false
      this.dialogVisible = true
    },
    saveData() {
      const { x, y1, y2, y3 } = this.form

      this.form.id = this.nextId
      this.form.x = BigNumber(x)
      this.form.y1 = BigNumber(y1)
      this.form.y2 = BigNumber(y2)
      this.form.y3 = BigNumber(y3)

      if (this.isEditTableData) {
        this.tableDataList[this.itemIndex] = this.form
      } else {
        this.tableDataList.push(this.form)
      }

      this.form = {}

      this.dialogVisible = false
    },
    editData(index) {
      this.itemIndex = index
      this.form = Object.assign({}, this.tableDataList[this.itemIndex])

      this.isEditTableData = true
      this.dialogVisible = true
    },
    deleteData(index) {
      this.tableDataList.splice(index, 1)
    },
    calculate() {
      if (this.tableDataList.length == 0) {
        return
      }

      // 计算 SR
      let sum = BigNumber(0)
      let sum2 = BigNumber(0)
      this.tableDataList.forEach((item) => {
        sum = sum.plus(
          this.e1(item.x, item.y1).plus(this.e1(item.x, item.y2).plus(this.e1(item.x, item.y3)))
        )
        sum2 = sum2.plus(BigNumber(item.x).minus(BigNumber(this.x)).pow(2))
      })

      let sr = sum.div(BigNumber(this.n).minus(2)).sqrt()

      // 计算 u(p2)
      let step1 = BigNumber(1).div(this.p)
      let step2 = BigNumber(1).div(this.n)
      let step3 = BigNumber(this.concentrationAvg).minus(BigNumber(this.x)).pow(2)
      let step4 = step3.div(sum2)
      let step5 = step1.plus(step2).plus(step4)
      let step6 = step5.sqrt()
      let step7 = sr.div(this.slope)
      let result = step7.times(step6)
      let result2 = result.div(this.concentrationAvg)
      this.sr = sr.toFixed(5)
      this.up = result.toFixed(5)
      this.up2 = result2.toFixed(5)
    },
    calculate1() {
      this.up3 = BigNumber(this.tuoZhanBuQueDingDu)
        .div(BigNumber(this.jinYangLiang).times(BigNumber(this.baoHanYinZi)))
        .toFixed(5)
      this.urp3 = BigNumber(this.up3).div(BigNumber(this.concentrationAvg)).toFixed(5)
    },
    calculate2() {
      this.urpp = BigNumber(this.urp11)
        .pow(2)
        .plus(BigNumber(this.urp22).pow(2).plus(BigNumber(this.urp33).pow(2)))
        .sqrt()
        .toFixed(5)
    },
    e1(x, y) {
      return BigNumber(y)
        .minus(BigNumber(this.intercept).plus(BigNumber(this.slope).times(BigNumber(x))))
        .pow(2)
    },
    nextId() {
      return ++this.id
    }
  }
}
</script>

<style lang="scss" scoped></style>
