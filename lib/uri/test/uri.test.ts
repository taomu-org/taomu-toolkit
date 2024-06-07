import { expect, test } from 'vitest'

import { isUrl, parseQuery, queryStringify } from '..'

test('isUrl', () => {
  expect(isUrl('http://www.ysinc.com')).toBe(true)
  expect(isUrl('https://www.ysinc.com')).toBe(true)
  expect(isUrl('http://ysinc.com')).toBe(true)
  expect(isUrl('www.ysinc.com')).toBe(false)
  expect(isUrl('file://xxx')).toBe(false)
})

test('parseQuery', () => {
  expect(parseQuery('a=1&b=2')).toEqual({ a: '1', b: '2' })
  expect(parseQuery('a=1&b=2&c=3')).toEqual({ a: '1', b: '2', c: '3' })
  expect(parseQuery('a=1&b=1231231231231231233213')).toEqual({ a: '1', b: '1231231231231231233213' })
  expect(parseQuery('a=1&b=!%40%23%24%25%5E%26*()_%2B%E4%B8%AD%E6%96%87')).toEqual({ a: '1', b: '!@#$%^&*()_+中文' })
})

test('queryStringify', () => {
  expect(queryStringify({ a: '1', b: '2' })).toBe('a=1&b=2')
  expect(queryStringify({ a: '1', b: '2', c: '3' })).toBe('a=1&b=2&c=3')
  expect(queryStringify({ a: '1', b: '1231231231231231233213' })).toBe('a=1&b=1231231231231231233213')
  expect(queryStringify({ a: '1', b: '!@#$%^&*()_+中文' })).toBe('a=1&b=!%40%23%24%25%5E%26*()_%2B%E4%B8%AD%E6%96%87')
})
