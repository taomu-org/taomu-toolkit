import { expect, test } from 'vitest'

import { mapInlineCssVars, mapInlineCssVarsToString, getCssVarPrefixWithGroups } from '..'

test('mapInlineCssVars', () => {
  expect(mapInlineCssVars()).toStrictEqual({})
  expect(mapInlineCssVars({ mainColor: 'red' })).toStrictEqual({ '--mainColor': 'red' })
  expect(
    mapInlineCssVars(
      {
        mainColor: 'red',
        mainColor2: 'blue',
      },
      'test'
    )
  ).toStrictEqual({
    '--test-mainColor': 'red',
    '--test-mainColor2': 'blue',
  })
})

test('mapInlineCssVarsToString', () => {
  expect(mapInlineCssVarsToString({})).toBe('')
  expect(mapInlineCssVarsToString({ mainColor: 'red' })).toBe('--mainColor: red;')
  expect(mapInlineCssVarsToString({ mainColor: 'red', mainColor2: 'blue' })).toBe('--mainColor: red; --mainColor2: blue;')
  expect(mapInlineCssVarsToString({ mainColor: 'red', mainColor2: 'blue' }, 'test')).toBe(
    '--test-mainColor: red; --test-mainColor2: blue;'
  )
})

test('getCssVarPrefixWithGroups', () => {
  expect(getCssVarPrefixWithGroups()).toBe('--')
  expect(getCssVarPrefixWithGroups('test')).toBe('--test-')
  expect(getCssVarPrefixWithGroups('test', 'test2')).toBe('--test-test2-')
  expect(getCssVarPrefixWithGroups('test', 'test2', 'test3')).toBe('--test-test2-test3-')
})
