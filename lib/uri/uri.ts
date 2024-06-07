import { deleteEmptyFields } from '../object'

/** 获取 url 参数 */
export function parseQuery(search = window.location.search) {
  const query: Record<string, any> = {}

  const searchH = search[0] === '?' ? search.substr(1) : search

  searchH.split('&').forEach((str) => {
    const strArr = str.split('=')
    const key = strArr[0]

    if (!key) return

    const val = decodeURIComponent(strArr[1])
    query[key] = val
  })
  return query
}

/**
 * 转换成 url search
 * @param obj
 * @param hasQuestionMark 是否带有问号
 * @returns
 */
export function queryStringify<T extends Record<string, any>>(obj: T, hasQuestionMark = false) {
  const arr = Object.keys(obj).map((key) => {
    let val = obj[key]

    if (typeof val !== 'string') {
      try {
        val = JSON.stringify(val)
      } catch (err) {
        console.error(err)
      }
    }

    return `${key}=${encodeURIComponent(val)}`
  })
  return (hasQuestionMark ? '?' : '') + arr.join('&')
}

/**
 * 替换当前 url search
 * @param nextQuery
 */
export function replaceQuery<T extends Record<string, any>>(nextQuery: T) {
  const query = parseQuery()
  let uri = `${location.origin}${location.pathname}${queryStringify(deleteEmptyFields({ ...query, ...nextQuery }))}`

  if (location.hash && location.hash !== '#') {
    uri += location.hash
  }

  window.history.replaceState({}, document.title, uri)
}

/**
 * 判断是否为 url
 * @param url
 * @returns
 */
export function isUrl(url: string) {
  return /^(https?:)?\/\//.test(url)
}
