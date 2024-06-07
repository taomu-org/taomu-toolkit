/**
 * 向上递归查找父级元素，直到满足参数2的选择器条件的父元素
 * 
 * - 没有符合条件的父元素时，返回 null
 *
 * @param node 需要查找的起点元素
 * @param selector 终点元素选择器
 */
export function findParentNode(node: HTMLElement, selector: string): HTMLElement | null {
  if (!node) return null
  if (node.matches(selector)) return node

  if (!node.parentElement) return null

  return findParentNode(node.parentElement, selector)
}

/**
 * 返回某一元素是否包含在另一个元素中
 *
 * @param node 内部元素
 * @param selector 外部元素选择器
 */
export function isChildOf(node: HTMLElement, selector: string | HTMLElement): boolean {
  if (!node || node === (window as any)) return false
  const groupNode = typeof selector === 'string' ? document.querySelector(selector) : selector
  if (!groupNode) return false
  if (node === groupNode) return false
  return groupNode?.contains(node)
}

/**
 * 返回某元素及其所有父元素是否存在指定类名
 *
 * @param node
 * @param className
 * @returns
 */
export function hasClassNameLoopParent(node: HTMLElement, className: string): boolean {
  if (!node) return false
  if (node?.classList?.contains(className)) return true
  if (!node?.parentElement) return false
  return hasClassNameLoopParent(node.parentElement, className)
}

/**
 * 返回某元素及其所有父元素是否存在指定 id
 *
 * @param node
 * @param id
 * @returns
 */
export function hasIdLoopParent(node: HTMLElement, id: string): boolean {
  if (!node) return false
  if (node?.id === id) return true
  if (!node?.parentElement) return false
  return hasIdLoopParent(node.parentElement, id)
}
