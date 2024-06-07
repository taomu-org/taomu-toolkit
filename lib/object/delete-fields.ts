import { isEmptyObject } from './base'

export interface DeleteFieldOptions {
  /** 是否递归删除 */
  deep?: boolean
  /** 是否删除空对象和空数组 */
  deleteEmptyObjectAndArray?: boolean
  /** 是否删除符串两端空格 */
  trimString?: boolean
}

export const DEFAULT_DELETE_FIELD_OPTIONS: DeleteFieldOptions = {
  deep: false,
  deleteEmptyObjectAndArray: false,
  trimString: false,
}

/**
 * 删除指定值的字段
 *
 * @param obj
 * @param delValues 需要删除的值的集合
 * @param options
 * @returns
 */
export function deleteFieldsByValue<T>(obj: T, delValues: Set<any>, optionsUnhandled?: DeleteFieldOptions): T {
  const options = Object.assign({}, DEFAULT_DELETE_FIELD_OPTIONS, optionsUnhandled)
  const { deep, deleteEmptyObjectAndArray, trimString } = options
  const res = {} as T

  for (const key in obj) {
    const val = obj[key]
    const isValArray = Array.isArray(val)

    if (deep && typeof val === 'object' && val !== null && !isValArray) {
      const newVal = deleteFieldsByValue(val, delValues, options)
      if (deleteEmptyObjectAndArray && isEmptyObject(newVal)) {
        continue
      } else {
        res[key] = newVal
      }
    } else if (isValArray) {
      const newVal = deleteFieldByValues_handleArrayItem(val, delValues, options)
      if (deleteEmptyObjectAndArray && newVal.length === 0) {
        continue
      } else {
        res[key] = newVal as any
      }
    } else if (!delValues.has(val)) {
      if (trimString && typeof val === 'string') {
        res[key] = val.trim() as any
      } else {
        res[key] = val
      }
    }
  }

  return res
}

/**
 * 删除对象中的空字段
 *
 *
 * @param obj
 * @param deep 是否递归删除
 * @param deleteEmptyObjectAndArray 是否删除空对象和空数组
 * @returns
 */
export function deleteEmptyFields<T>(obj: T, options?: DeleteFieldOptions): T {
  return deleteFieldsByValue(obj, new Set([undefined, null, '']), options)
}

/**
 * 内部方法
 * deleteFieldByValues 内部处理数组的逻辑
 *
 * @private
 * @param arr
 * @param values
 * @param options
 * @returns
 */
function deleteFieldByValues_handleArrayItem(arr: any[], values: Set<any>, options: DeleteFieldOptions) {
  const resArr: any[] = []

  for (let index = 0; index < arr.length; index++) {
    const item = arr[index]
    if (values.has(item)) {
      continue
    }

    if (Array.isArray(item)) {
      if (options.deep) {
        const subArr = deleteFieldByValues_handleArrayItem(item, values, options)
        if (options.deleteEmptyObjectAndArray && subArr.length === 0) {
          continue
        } else {
          resArr.push(subArr)
        }
      } else {
        resArr.push(item)
      }
    } else if (options.deep && typeof item === 'object') {
      resArr.push(deleteFieldsByValue(item, values, options))
    } else if (options.trimString && typeof item === 'string') {
      resArr.push(item.trim())
    } else {
      resArr.push(item)
    }
  }

  return resArr
}
