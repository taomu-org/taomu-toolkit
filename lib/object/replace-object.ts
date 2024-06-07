import { isEqual } from '../lodash'

export interface ReplaceObjectConfigItem {
  /** 要替换的值 */
  value: any
  /** 替换后的值 */
  replaceValue?: any
  /** 替换方法，返回值为替换后的值 */
  replaceMethod?: (key: string | number, value: any, replaceValue: any) => any
}

/**
 * 替换对象中的值
 *
 * - 支持基本类型 & 对象 & 数组
 * - deep 模式下支持递归替换，但不会替换数组成员
 *
 * 常见使用场景：部分编辑页中的保存接口，需要替换 undefined 为 空字符串，以达到清空字段的效果
 *
 * @param obj
 * @param replaceConfig
 * @param deep 是否递归替换
 */
export function replaceObjectValues<T extends Record<string | number, any>>(
  obj: T,
  replaceConfig?: ReplaceObjectConfigItem | ReplaceObjectConfigItem[],
  deep = false
) {
  if (!replaceConfig) return obj

  const replaceConfigArr = Array.isArray(replaceConfig) ? replaceConfig : [replaceConfig]

  if (!replaceConfigArr?.length) {
    return obj
  }

  const result = { ...obj }

  for (const key in result) {
    if (!Object.prototype.hasOwnProperty.call(result, key)) {
      continue // 忽略不可枚举的字段
    }

    const val = result[key]

    if (deep && typeof val === 'object' && val !== null && !Array.isArray(val)) {
      result[key] = replaceObjectValues(val, replaceConfigArr, true)
    } else {
      for (let i = 0; i < replaceConfigArr.length; i++) {
        const item = replaceConfigArr[i]
        if (isEqual(val, item.value)) {
          result[key] = item.replaceMethod ? item.replaceMethod(key, val, item.replaceValue) : item.replaceValue
        }
      }
    }
  }

  return result
}
