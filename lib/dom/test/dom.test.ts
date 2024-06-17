// @vitest-environment jsdom

import { expect, test } from 'vitest'

import { findParentNode, isChildOf, hasClassNameLoopParent, hasIdLoopParent } from '..'

const node0 = document.createElement('div')
node0.id = 'id-lv-0'
node0.className = 'lv-0'

const node1 = document.createElement('div')
node1.id = 'id-lv-1'
node1.className = 'lv-1'

const node2 = document.createElement('div')
node2.id = 'id-lv-2'
node2.className = 'lv-2'

const node3 = document.createElement('div')
node3.id = 'id-lv-3'
node3.className = 'lv-3'

const node4 = document.createElement('div')
node4.id = 'id-lv-4'
node4.className = 'lv-4'

document.body.appendChild(node0)
node0.appendChild(node1)
node1.appendChild(node2)
node2.appendChild(node3)
node3.appendChild(node4)

test('findParentNode', () => {
  expect(findParentNode(node4, 'div.lv-2')?.id).toBe('id-lv-2')
  expect(findParentNode(node3, 'div.lv-2')?.id).toBe('id-lv-2')
  expect(findParentNode(node1, 'div.lv-2')).toBe(null)
  expect(findParentNode(node4, 'div.lv-211')?.id).toBe(undefined)

  expect(findParentNode(node4, '#id-lv-2')?.id).toBe('id-lv-2')
  expect(findParentNode(node4, '#id-lv-2', node3)?.id).toBe(undefined)
  expect(findParentNode(node4, '#id-lv-2', '#id-lv-3')?.id).toBe(undefined)
  expect(findParentNode(node4, '#id-lv-2', node2)?.id).toBe('id-lv-2')
  expect(findParentNode(node4, '#id-lv-2', '#id-lv-2')?.id).toBe('id-lv-2')
  expect(findParentNode(node4, '#id-lv-2', '#id-lv-1')?.id).toBe('id-lv-2')
})

test('isChildOf', () => {
  expect(isChildOf(node4, node3)).toBe(true)
  expect(isChildOf(node3, node4)).toBe(false)
  expect(isChildOf(node4, node4)).toBe(false)
  expect(isChildOf(node4, node0)).toBe(true)
  expect(isChildOf(node4, document.body)).toBe(true)
})

test('hasClassNameLoopParent', () => {
  expect(hasClassNameLoopParent(node4, 'lv-4')).toBe(true)
  expect(hasClassNameLoopParent(node4, 'lv-2')).toBe(true)
  expect(hasClassNameLoopParent(node4, 'lv-0')).toBe(true)
  expect(hasClassNameLoopParent(node2, 'lv-1')).toBe(true)
  expect(hasClassNameLoopParent(node2, 'lv-3')).toBe(false)
})

test('hasIdLoopParent', () => {
  expect(hasIdLoopParent(node4, 'id-lv-4')).toBe(true)
  expect(hasIdLoopParent(node4, 'id-lv-2')).toBe(true)
  expect(hasIdLoopParent(node4, 'id-lv-0')).toBe(true)
  expect(hasIdLoopParent(node2, 'id-lv-1')).toBe(true)
  expect(hasIdLoopParent(node2, 'id-lv-3')).toBe(false)
})
