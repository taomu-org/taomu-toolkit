/**
 * 获取滚动条宽度 (body)
 *
 * @returns 返回滚动条宽度
 */
export function getScrollbarWidth() {
  const bodyWidth = document.body.clientWidth
  const windowWidth = window.innerWidth
  const scrollBarWidth = windowWidth - bodyWidth
  return scrollBarWidth
}
