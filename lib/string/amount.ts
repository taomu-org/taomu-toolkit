/**
 * 格式化金额 千分符
 *
 * 无法处理大于 999999999999999 的数字
 *
 * @param value
 * @param digits 小数点位数
 * @param ignoreMin 小于此数值不格式化千分符
 * @returns
 */
export function formatAmount(value?: number | string | null, digits = 2, ignoreMin = 100000): string {
  const needFixed = !!digits
  const num = Number(value || 0)
  if (isNaN(num)) {
    return needFixed ? (0).toFixed(digits) : '0'
  }

  const str = needFixed ? num.toFixed(digits) : num.toString()

  if (ignoreMin && num < ignoreMin) {
    return str
  }

  const arr = str.split('.')

  let result = arr[0] ? arr[0].replace(/(?=(?!\b)(\d{3})+$)/g, ',') : '0'
  if (arr[1] != null) {
    result += `.${arr[1]}`
  }

  return result
}

/**
 * 格式化金额带羊角符
 *
 * @param value
 * @param digits
 * @param prefix
 * @param ignoreMin
 * @returns
 */
export function formatAmountWithPrefix(
  value?: number | string | null,
  digits?: number,
  prefix = '¥',
  ignoreMin?: number
): string {
  return `${prefix}${formatAmount(value, digits, ignoreMin)}`
}
