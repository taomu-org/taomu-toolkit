import { expect, test } from 'vitest'

import { trimValues } from '../trim'

test('trimValues', () => {
  expect(trimValues({ a: ' 1 ', b: ' 2 ', c: ' 3 ' })).toEqual({ a: '1', b: '2', c: '3' })
  expect(trimValues({ a: ' 1 ', b: ' 2 ', c: ' 3 ', d: undefined })).toEqual({ a: '1', b: '2', c: '3', d: undefined })
  expect(trimValues({ a: ' 1 ', b: ' 2 ', c: ' 3 ', d: undefined }, true)).toEqual({ a: '1', b: '2', c: '3' })
  expect(trimValues({ a: ' 1 ', b: ' 2 ', c: ' 3 ', d: undefined }, true, false)).toEqual({ a: ' 1 ', b: ' 2 ', c: ' 3 ' })
})
