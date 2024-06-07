/**
 * 删除对象中字符串两端空格
 *
 * @param {T} obj
 * @param trim 是否删除两端空格
 * @param deleteUndefined 是否删除值为 undefined 的字段
 * @returns {T}
 */
export function trimValues<T>(obj: T, deleteUndefined = true, trim = true): T {
  if ((!trim && !deleteUndefined) || typeof obj !== 'object' || Array.isArray(obj)) return obj

  const res = {} as T
  for (const key in obj) {
    if (deleteUndefined && obj[key] === undefined) continue

    if (!trim) {
      res[key] = obj[key]
      continue
    }

    if (typeof obj[key] === 'string') {
      res[key] = (obj[key] as string).trim() as any
    } else {
      res[key] = obj[key]
    }
  }
  return res
}
