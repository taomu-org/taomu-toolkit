import { expect, test } from 'vitest'

import { isEmptyObject, hasProperty, pick, omit, tryJSONParse } from '../base'

test('isEmptyObject', () => {
  expect(isEmptyObject({})).toBe(true)
  expect(isEmptyObject({ a: 1 })).toBe(false)
})

test('hasProperty', () => {
  expect(hasProperty({ a: 1 }, 'a')).toBe(true)
  expect(hasProperty({ a: 1 }, 'b')).toBe(false)
  expect(hasProperty({ a: 1 }, ['a'])).toBe(true)
  expect(hasProperty({ a: 1 }, ['a', 'b'])).toBe(false)
  expect(hasProperty({ a: 1, b: 1 }, ['a', 'b'])).toBe(true)
})

test('pick', () => {
  expect(pick({ a: 1, b: 2, c: 3 }, ['a', 'b'])).toEqual({ a: 1, b: 2 })
  expect(pick({ a: 1, b: 2, c: 3 }, ['a', 'c'])).toEqual({ a: 1, c: 3 })
  expect(pick({ a: 1, b: 2, c: 3 } as Record<string, any>, ['a', 'd'])).toEqual({ a: 1 })
  expect(pick({ a: 1, b: 2, c: 3 } as Record<string, any>, [])).toEqual({})
})

test('omit', () => {
  expect(omit({ a: 1, b: 2, c: 3 }, ['a', 'b'])).toEqual({ c: 3 })
  expect(omit({ a: 1, b: 2, c: 3 }, ['a', 'c'])).toEqual({ b: 2 })
  expect(omit({ a: 1, b: 2, c: 3 } as Record<string, any>, ['a', 'd'])).toEqual({ b: 2, c: 3 })
  expect(omit({ a: 1, b: 2, c: 3 }, [])).toEqual({ a: 1, b: 2, c: 3 })
  expect(omit({}, [])).toEqual({})
  expect(omit({ a: 1 }, [])).toEqual({ a: 1 })
  expect(omit({ a: 1 }, ['a'])).toEqual({})
})

test('tryJSONParse', () => {
  expect(tryJSONParse('')).toEqual('')
  expect(tryJSONParse('', {})).toEqual({})
  expect(tryJSONParse('aaa')).toEqual('aaa')
  expect(tryJSONParse('', null)).toEqual(null)
  expect(tryJSONParse('aaa', 'err')).toEqual('err')
  expect(tryJSONParse(undefined as any)).toEqual(undefined)
  expect(tryJSONParse('[]')).toEqual([])
  expect(tryJSONParse('{"a":1}')).toEqual({ a: 1 })
  expect(tryJSONParse('["1","2","3"]')).toEqual(['1', '2', '3'])
})
