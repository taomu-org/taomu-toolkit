/**
 * 判断数组中是否有重复元素
 *
 * - 如果有，返回 true
 */
export function hasDuplicate<T>(arr: T[]): boolean {
  return new Set(arr).size !== arr.length
}

/**
 * 判断数组内容是否相同
 */
export function isArraySame<T>(arr1: T[], arr2: T[]): boolean {
  if (arr1.length !== arr2.length) {
    return false
  }

  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) {
      return false
    }
  }

  return true
}
