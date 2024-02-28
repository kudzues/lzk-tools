<template>
  <NavBar title="步骤一" sub-title="测量结果分析" next-path="/step2" />

  <div class="flex flex-1 overflow-x-hidden pl-2 pr-2">
    <div class="flex-auto overflow-x-hidden">
      <table class="table table-md table-pin-rows">
        <thead>
          <tr>
            <td>样品编号</td>
            <td>样品质量/<vue-latex expression="g" :fontsize="12" /></td>
            <td>测定吸光度</td>
            <td>镉浓度/<vue-latex expression="(\mu g \cdot L^{-1})" :fontsize="12" /></td>
            <td>镉含量/<vue-latex expression="(mg \cdot kg^{-1} )" :fontsize="12" /></td>
            <td>操作</td>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in tableData" :key="item.id">
            <td>{{ item.name }}</td>
            <td>{{ item.mass.toString() }}</td>
            <td>{{ item.measurement.toString() }}</td>
            <td>{{ item.concentration.toString() }}</td>
            <td>{{ item.content.toString() }}</td>
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
    <div class="flex-1 pl-4 pr-4">
      <div class="control">
        <button class="btn btn-success text-white btn-sm mr-2" @click="addTableData">
          添加数据
        </button>
      </div>
      <div class="calculate mt-3">
        <div>
          样品质量平均值：<span class="text-red-600"
            >{{ massAvg }}/<vue-latex expression="g" :fontsize="12"
          /></span>
        </div>
        <div>
          测定吸光度平均值：<span class="text-red-600">{{ measurementAvg }}</span>
        </div>
        <div>
          镉浓度平均值：<span class="text-red-600"
            >{{ concentrationAvg }}/<vue-latex expression="(\mu g \cdot L^{-1})" :fontsize="12"
          /></span>
        </div>
        <div>
          镉含量平均值：<span class="text-red-600"
            >{{ contentAvg }}/<vue-latex expression="(mg \cdot kg^{-1} )" :fontsize="12"
          /></span>
        </div>
      </div>
    </div>
  </div>
  <el-dialog
    v-model="dialogVisible"
    :title="isDialogEdit ? '编辑数据' : '添加数据'"
    :close-on-click-modal="false"
    :draggable="true"
    width="400"
  >
    <el-form :model="form" label-position="top">
      <el-form-item label="样品编号">
        <el-input v-model="form.name" type="text" autocomplete="off" :clearable="true" />
      </el-form-item>
      <el-form-item label="样品质量">
        <el-input v-model="form.mass" type="number" autocomplete="off" />
      </el-form-item>
      <el-form-item label="测定吸光度">
        <el-input v-model="form.measurement" type="number" autocomplete="off" />
      </el-form-item>
      <el-form-item label="镉浓度">
        <el-input v-model="form.concentration" type="number" autocomplete="off" />
      </el-form-item>
      <el-form-item label="镉含量">
        <el-input v-model="form.content" type="number" autocomplete="off" />
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
import { calculateAverageByKey } from '../utils/maths'
import { useMassAvgStore } from '../stores/massAvg'
import { useConcentrationAvgStore } from '../stores/concentrationAvg'
import { useContentAvgStore } from '../stores/contentAvg'
import { useContentStore } from '../stores/content'
export default {
  components: {
    NavBar
  },
  setup() {
    const massAvgStore = useMassAvgStore()
    const concentrationAvgStore = useConcentrationAvgStore()
    const contentAvgStore = useContentAvgStore()
    const contentStore = useContentStore()

    return { massAvgStore, concentrationAvgStore, contentAvgStore, contentStore }
  },
  data() {
    return {
      tableData: [],
      dialogVisible: false,
      isDialogEdit: true,
      id: 0,
      form: {},
      itemIndex: 0,
      massAvg: '0.0000',
      measurementAvg: '0.0000',
      concentrationAvg: '0.000',
      contentAvg: '0.000'
    }
  },
  methods: {
    // 添加数据
    addTableData() {
      this.form = {
        id: 0,
        name: '未命名',
        mass: 0,
        measurement: 0,
        concentration: 0,
        content: 0
      }

      this.isDialogEdit = false
      this.dialogVisible = true
    },
    saveData() {
      const { mass, measurement, concentration, content } = this.form
      this.form.id = this.nextId()

      this.form.mass = BigNumber(mass)
      this.form.measurement = BigNumber(measurement)
      this.form.concentration = BigNumber(concentration)
      this.form.content = BigNumber(content)

      if (this.isDialogEdit) {
        this.tableData[this.itemIndex] = this.form
      } else {
        this.tableData.push(this.form)
      }

      this.form = {}

      this.dialogVisible = false

      this.calculate()
    },
    editData(index) {
      this.itemIndex = index
      this.form = Object.assign({}, this.tableData[this.itemIndex])

      this.isDialogEdit = true
      this.dialogVisible = true
    },
    deleteData(index) {
      this.tableData.splice(index, 1)

      this.calculate()
    },
    // 计算 id
    nextId() {
      return ++this.id
    },
    calculate() {
      if (this.tableData.length == 0) {
        this.massAvg = '0.0000'
        this.measurementAvg = '0.0000'
        this.concentrationAvg = '0.000'
        this.contentAvg = '0.000'
      } else {
        this.massAvg = calculateAverageByKey(this.tableData, 'mass', 4)
        this.measurementAvg = calculateAverageByKey(this.tableData, 'measurement', 4)
        this.concentrationAvg = calculateAverageByKey(this.tableData, 'concentration', 3)
        this.contentAvg = calculateAverageByKey(this.tableData, 'content', 3)

        let array = []
        this.tableData.forEach((item) => {
          array.push(item.content)
        })
        this.contentStore.setContent(array)
      }

      this.massAvgStore.setMassAvg(this.massAvg)
      this.concentrationAvgStore.setConcentrationAvg(this.concentrationAvg)
      this.contentAvgStore.setContentAvg(this.contentAvg)
    }
  }
}
</script>

<style lang="scss" scoped></style>
