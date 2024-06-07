/** 休眠一段时间，单位毫秒 */
export async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

/** sleep alias */
export const delay = sleep
