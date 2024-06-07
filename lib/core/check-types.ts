export function isDef<T>(val: T): val is NonNullable<T> {
  return val !== undefined && val !== null
}

export function isFunction(val: unknown): val is Function {
  return typeof val === 'function'
}

// export function isPromise<T = any>(val: unknown): val is Promise<T> {
//   return isObject(val) && isFunction(val.then) && isFunction(val.catch)
// }

export function isPromise<T = any>(val: unknown): val is Promise<T> {
  return val instanceof Promise
}

export function isObject(val: unknown): val is Record<any, any> {
  return val !== null && typeof val === 'object'
}

export function isArray(val: unknown): val is any[] {
  return Array.isArray(val)
}

export function isError(val: unknown): val is Error {
  return val instanceof Error
}
