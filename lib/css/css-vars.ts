import { isDef } from '../core'

export type CssVarsValueType = string | number | undefined

export function mapInlineCssVars<T extends object>(obj?: T, group?: string): Record<string, string> {
  const result: Record<string, string> = {}
  const prefix = getCssVarPrefixWithGroups(group)

  for (const key in obj) {
    let val = obj[key] as CssVarsValueType
    if (!isDef(val)) continue

    if (typeof val === 'number') {
      val = val + 'px'
    }

    result[`${prefix}${key}`] = val
  }

  return result
}

export function mapInlineCssVarsToString<T extends object>(obj?: T, group?: string): string {
  const prefix = getCssVarPrefixWithGroups(group)
  let resultStr = ''

  for (const key in obj) {
    let val = obj[key] as CssVarsValueType
    if (!isDef(val)) continue

    if (typeof val === 'number') {
      val = val + 'px'
    }

    resultStr += `${prefix}${key}: ${val}; `
  }

  return resultStr.trim()
}

export function getCssVarPrefixWithGroups(...groupNames: (string | undefined)[]): string {
  let prefix = '--'

  for (const groupName of groupNames) {
    if (groupName) {
      prefix += `${groupName}-`
    }
  }

  return prefix
}
