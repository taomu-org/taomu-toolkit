import { expect, test } from 'vitest'

import { mapInlineCssVars, mapInlineCssVarsToString } from '..'

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
