import { isDef } from '../core'

export function mapInlineCssVars<T extends Record<string, any | undefined>>(obj?: T, group?: string): Record<string, string> {
  const result: Record<string, string> = {}
  const prefix = '--' + (typeof group === 'string' ? `${group}-` : '')

  for (const key in obj) {
    let val = obj[key] as any
    if (!isDef(val)) continue

    if (typeof val === 'number') {
      val = val + 'px'
    }

    result[`${prefix}${key}`] = val
  }

  return result
}

export function mapInlineCssVarsToString<T extends Record<string, any | undefined>>(obj?: T, group?: string): string {
  const prefix = '--' + (typeof group === 'string' ? `${group}-` : '')
  let resultStr = ''

  for (const key in obj) {
    let val = obj[key] as any
    if (!isDef(val)) continue

    if (typeof val === 'number') {
      val = val + 'px'
    }

    resultStr += `${prefix}${key}: ${val}; `
  }

  return resultStr.trim()
}
