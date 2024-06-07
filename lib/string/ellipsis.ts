/**
 * 文本超出省略
 */
export function ellipsis(text: string, maxLength: number): string {
  if (text.length > maxLength) {
    return text.substring(0, maxLength) + `[+${text.length - maxLength}]...`
  }
  return text
}
