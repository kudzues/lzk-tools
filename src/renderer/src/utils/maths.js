import BigNumber from 'bignumber.js'

/**
 * 计算数组中对象 key 属性的值的平均值
 * @param {*} array 数组
 * @param {*} key 属性
 * @param {*} dp 小数精准位
 */
function calculateAverageByKey(array, key, dp) {
  const values = array.map((item) => item[key])

  const sum = values.reduce((prev, curr) => {
    return prev.plus(curr)
  }, BigNumber(0))

  return sum.div(array.length).toFixed(dp)
}

export { calculateAverageByKey }
