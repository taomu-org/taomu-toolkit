import { isEqual } from '../'

import { expect, test } from 'vitest'

test('isEqual', () => {
  expect(isEqual(NaN, NaN)).toBe(true)
  expect(isEqual(NaN, null)).toBe(false)
  expect(isEqual(undefined, undefined)).toBe(true)
  expect(isEqual(undefined, '')).toBe(false)
  expect(isEqual(undefined, null)).toBe(false)
  expect(isEqual(null, null)).toBe(true)
  expect(isEqual({ a: 1 }, { a: 1 })).toBe(true)
  expect(isEqual({ a: 1 }, { a: '1' })).toBe(false)
  expect(isEqual({ a: 1 }, { a: 2 })).toBe(false)
  expect(isEqual({ a: 1 }, { b: 1 })).toBe(false)
  expect(isEqual({ a: 1, b: [] }, { a: 1, b: [] })).toBe(true)
  expect(isEqual({ a: 1, b: [1] }, { a: 1, b: [2] })).toBe(false)
  expect(isEqual({ a: 1, b: [1] }, { a: 1, b: [2] })).toBe(false)
  expect(isEqual({ a: 1, b: [1, 2, 3] }, { a: 1, b: [1, 2, 3] })).toBe(true)
  expect(isEqual({ a: 1, b: [1, 2, 3] }, { a: 1, b: [1, 2, 4] })).toBe(false)
})
