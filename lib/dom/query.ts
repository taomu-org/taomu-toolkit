/**
 * 向上递归查找父级元素，直到满足参数2的选择器条件的父元素
 *
 * - 没有符合条件的父元素时，返回 null
 *
 * @param node 需要查找的起点元素
 * @param selector 终点元素选择器
 * @param stopNode 停止查找的元素, 用于在已知范围内查找时优化性能
 */
export function findParentNode(node: HTMLElement, selector: string, stopNode?: HTMLElement | string): HTMLElement | null {
  if (!node) return null
  if (!node.matches) return null
  if (node.matches(selector)) return node

  if (stopNode) {
    if (typeof stopNode === 'string') {
      if (node.matches(stopNode)) return null
    } else {
      if (node === stopNode) return null
    }
  }

  if (!node.parentElement) return null

  return findParentNode(node.parentElement, selector, stopNode)
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
 * 返回某元素及其所有父元素是否存在指定选择器
 *
 * @param node
 * @param selector
 * @param stopNode 用于在已知范围内查找时优化性能
 *
 * @returns
 */
export function hasSelectorLoopParent(node: HTMLElement, selector: string, stopNode?: HTMLElement | string): boolean {
  if (!node) return false
  if (!node.matches) return false
  if (node.matches(selector)) return true

  if (stopNode) {
    if (typeof stopNode === 'string') {
      if (node.matches(stopNode)) return false
    } else {
      if (node === stopNode) return false
    }
  }

  if (!node?.parentElement) return false

  return hasSelectorLoopParent(node.parentElement, selector, stopNode)
}
