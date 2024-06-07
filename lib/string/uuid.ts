/** 生成一组随机 ID */
export function uuid(t = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'): string {
  return t.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0,
      v = c == 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}
