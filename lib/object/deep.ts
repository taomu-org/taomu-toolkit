/**
 * 深度合并对象, 只支持对象
 *
 * 遇到数组不做任何处理
 */
export function deepMergeObject<T>(...objs: T[]): T {
  const result = {} as T

  objs.forEach((obj) => {
    if (!obj || typeof obj !== 'object' || Array.isArray(obj)) return

    for (const key in obj) {
      if (!Object.prototype.hasOwnProperty.call(obj, key)) {
        continue
      }

      const val = obj[key]

      if (val && typeof val === 'object' && !Array.isArray(val)) {
        result[key] = deepMergeObject(result[key], val)
      } else {
        result[key] = val
      }
    }
  })

  return result
}

/**
 * 深拷贝，支持常见类型
 */
export function deepClone<T = unknown>(values: T): T {
  let copy: any

  // Handle the 3 simple types, and null or undefined
  if (null == values || 'object' != typeof values) return values

  // Handle Date
  if (values instanceof Date) {
    copy = new Date()
    copy.setTime(values.getTime())
    return copy
  }

  // Handle Array
  if (values instanceof Array) {
    copy = []
    for (let i = 0, len = values.length; i < len; i++) {
      copy[i] = deepClone(values[i])
    }
    return copy
  }

  // Handle Object
  if (values instanceof Object) {
    copy = {}
    for (const attr in values) {
      if (Object.prototype.hasOwnProperty.call(values, attr)) copy[attr] = deepClone(values[attr])
    }
    return copy
  }

  throw new Error('Unable to copy values! Its type isn,t supported.')
}
