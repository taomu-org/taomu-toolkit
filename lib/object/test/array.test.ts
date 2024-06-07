import { expect, test } from 'vitest'

import { hasDuplicate, isArraySame } from '../array'

test('hasDuplicate', () => {
  expect(hasDuplicate([])).toBe(false)
  expect(hasDuplicate([1, 2, 3])).toBe(false)
  expect(hasDuplicate([1, 2, 3, 1])).toBe(true)
  expect(hasDuplicate(['a', 'b', 'c', 'a'])).toBe(true)
  expect(hasDuplicate(['a', 'b', 'c', 'd'])).toBe(false)
})

test('isArraySame', () => {
  expect(isArraySame([1, 2, 3], [1, 2, 3])).toBe(true)
  expect(isArraySame([1, 2, 3], [1, 2, 4])).toBe(false)
  expect(isArraySame([1, 2, 3], [1, 2])).toBe(false)
  expect(isArraySame([1, 2, 3], [1, 2, 3, 4])).toBe(false)
  expect(isArraySame([1, 2, null], [1, 2, null])).toBe(true)
  expect(isArraySame([1, 2, undefined], [1, 2, undefined])).toBe(true)
  expect(isArraySame([1, 2, null], [1, 2, undefined])).toBe(false)
  expect(isArraySame([1, 2, {}], [1, 2, {}])).toBe(false)
})
