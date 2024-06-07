import { OptionsItemType } from '../defines'

/** 将枚举转换为选项列表 */
export function parseEnumToOptions<T extends Record<string, any>, K extends keyof T>(e: T, omit?: K[]) {
  const options: OptionsItemType[] = []

  for (const label in e) {
    if (!isNaN(Number(label))) continue
    const value = e[label]
    if (omit && omit.includes(label as unknown as K)) continue
    options.push({ label, value })
  }

  return options
}
