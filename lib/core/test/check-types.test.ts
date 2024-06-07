import { expect, test } from 'vitest'

import { isDef, isObject, isArray, isFunction, isPromise, isError } from '..'

test('isDef', () => {
  expect(isDef(null)).toBe(false)
  expect(isDef(undefined)).toBe(false)
  expect(isDef(0)).toBe(true)
  expect(isDef('')).toBe(true)
  expect(isDef(false)).toBe(true)
  expect(isDef({})).toBe(true)
  expect(isDef([])).toBe(true)
  expect(isDef(new Error())).toBe(true)
})

test('isObject', () => {
  expect(isObject(null)).toBe(false)
  expect(isObject(undefined)).toBe(false)
  expect(isObject(0)).toBe(false)
  expect(isObject('')).toBe(false)
  expect(isObject(false)).toBe(false)
  expect(isObject({})).toBe(true)
  expect(isObject([])).toBe(true)
  expect(isObject(new Error())).toBe(true)
  expect(isObject(() => {})).toBe(false)
})

test('isArray', () => {
  expect(isArray(null)).toBe(false)
  expect(isArray(undefined)).toBe(false)
  expect(isArray(0)).toBe(false)
  expect(isArray('')).toBe(false)
  expect(isArray(false)).toBe(false)
  expect(isArray({})).toBe(false)
  expect(isArray([])).toBe(true)
  expect(isArray(new Error())).toBe(false)
})

test('isFunction', () => {
  expect(isFunction(null)).toBe(false)
  expect(isFunction(undefined)).toBe(false)
  expect(isFunction(0)).toBe(false)
  expect(isFunction('')).toBe(false)
  expect(isFunction(false)).toBe(false)
  expect(isFunction({})).toBe(false)
  expect(isFunction([])).toBe(false)
  expect(isFunction(new Error())).toBe(false)
  expect(isFunction(() => {})).toBe(true)
})

test('isPromise', () => {
  expect(isPromise(null)).toBe(false)
  expect(isPromise(undefined)).toBe(false)
  expect(isPromise(0)).toBe(false)
  expect(isPromise('')).toBe(false)
  expect(isPromise(false)).toBe(false)
  expect(isPromise({})).toBe(false)
  expect(isPromise([])).toBe(false)
  expect(isPromise(new Error())).toBe(false)
  expect(isPromise(() => {})).toBe(false)
  expect(isPromise(Promise.resolve())).toBe(true)
})

test('isError', () => {
  expect(isError(null)).toBe(false)
  expect(isError(undefined)).toBe(false)
  expect(isError(0)).toBe(false)
  expect(isError('')).toBe(false)
  expect(isError(false)).toBe(false)
  expect(isError({})).toBe(false)
  expect(isError([])).toBe(false)
  expect(isError(new Error())).toBe(true)
})