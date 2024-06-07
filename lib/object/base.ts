/** 是否是空对象 */
export function isEmptyObject(obj: Record<string, any>) {
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      return false
    }
  }
  return true
}

/**
 * 判断对象中是否包含某些字段
 *
 * @param obj
 * @param name
 * @param strict 严格模式，包含的字段必须全部存在，默认 true
 * @returns
 */
export function hasProperty<T extends object, K extends keyof T>(
  obj: T,
  name: K | (string & {}) | (K | (string & {}))[],
  strict = true
): boolean {
  const keys = (typeof name === 'string' ? [name] : name) as K[]

  let passCount = 0

  for (const key of keys) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      passCount++
      if (!strict) {
        return true
      }
    }
  }

  if (strict) {
    return passCount === keys.length
  }

  return false
}

/**
 * 从对象中提取某些字段
 *
 * @param obj
 * @param pickedArr
 * @returns
 */
export function pick<T extends object, K extends keyof T>(obj: T, pickedArr: K[]): Pick<T, K> {
  let result: Partial<T> = obj
  if (obj !== null && typeof obj === 'object') {
    result = {}
    const keys = Object.keys(obj) as K[]
    for (const key of keys) {
      if (pickedArr.indexOf(key) !== -1) {
        result[key] = obj[key]
      }
    }
  }
  return result as Pick<T, K>
}

/**
 * 从对象中剔除某些字段
 *
 * @param obj
 * @param omitArr
 * @returns
 */
export function omit<T extends object, K extends keyof T>(obj: T, omitArr: K[]): Omit<T, K> {
  let result: T = { ...obj }
  if (obj !== null && typeof obj === 'object') {
    omitArr.forEach((key) => {
      delete result[key]
    })
  }
  return result as Omit<T, K>
}

/**
 * 尝试将字符串解析为 JSON 数据
 *
 * - 失败返回源数据
 *
 * @param str
 * @param errData 失败时返回的数据
 * @returns
 */
export function tryJSONParse<T = any>(str: string, errData?: T) {
  try {
    return JSON.parse(str)
  } catch (e) {
    return errData === undefined ? str : errData
  }
}
