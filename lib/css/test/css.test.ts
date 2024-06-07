import { expect, test } from 'vitest'

import { mapInlineCssVars } from '..'

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
