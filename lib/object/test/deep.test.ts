import { expect, test } from 'vitest'

import { deepClone, deepMergeObject } from '../deep'

test('deepClone', () => {
  expect(deepClone({})).toEqual({})
  expect(deepClone({ a: 1 })).toEqual({ a: 1 })
  expect(deepClone(['1', '2', '3'])).toEqual(['1', '2', '3'])
  expect(deepClone({ a: { b: 1 } })).toEqual({ a: { b: 1 } })
  expect(deepClone({ a: { b: 1, c: { d: 1 } } })).toEqual({ a: { b: 1, c: { d: 1 } } })
})

test('deepMergeObject', () => {
  expect(deepMergeObject({ a: 1 }, { a: 2 })).toEqual({ a: 2 })
  expect(deepMergeObject({ a: 1, b: { b1: 1, b2: 2 } }, { a: 2, b: { b3: 3 } })).toEqual({ a: 2, b: { b1: 1, b2: 2, b3: 3 } })
  expect(deepMergeObject({ a: 1, b: { b1: 1, b2: 2 } }, { a: 2, b: { b2: 3 } })).toEqual({ a: 2, b: { b1: 1, b2: 3 } })
  expect(deepMergeObject({ a: 1, b: { b1: 1, b2: 2 } }, { a: 2, b: {} })).toEqual({ a: 2, b: { b1: 1, b2: 2 } })
  expect(deepMergeObject({ a: 1, b: { b1: 1, b2: 2 } }, { a: 2, b: undefined })).toEqual({ a: 2, b: undefined })
  expect(deepMergeObject({ a: 1 }, { a: 2 }, { a: 3 })).toEqual({ a: 3 })
  expect(deepMergeObject({ a: 1, b: 2 }, { a: -1, c: 3 })).toEqual({ a: -1, b: 2, c: 3 })
  expect(deepMergeObject({ a: 1, b: 2 }, { a: -1, c: 3 }, { a: 4, d: 5 })).toEqual({ a: 4, b: 2, c: 3, d: 5 })
})
