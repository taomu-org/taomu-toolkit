import { expect, test } from 'vitest'

import { replaceObjectValues } from '../replace-object'

test('replaceObjectValues', () => {
  expect(
    replaceObjectValues({ a: 1, b: {}, c: [1, 2, 3], d: undefined, e: '1', f: 'static' }, [
      { value: 1, replaceValue: 2 },
      { value: {}, replaceValue: { replace: true } },
      { value: [1, 2, 3], replaceValue: [4, 5, 6] },
      { value: undefined, replaceValue: null },
      { value: '1', replaceValue: '2' },
    ])
  ).toEqual({ a: 2, b: { replace: true }, c: [4, 5, 6], d: null, e: '2', f: 'static' })

  expect(
    replaceObjectValues({ a: 1, b: {}, c: [1, 2, 3], d: { c: 1, d: 2 }, f: 'static' }, { value: 1, replaceValue: 2 }, true)
  ).toEqual({ a: 2, b: {}, c: [1, 2, 3], d: { c: 2, d: 2 }, f: 'static' })

  expect(
    replaceObjectValues(
      { a: 1, b: 1, c: 3 },
      [
        {
          value: 1,
          replaceValue: 2,
          replaceMethod: (key, value, replaceValue) => {
            if (key === 'b') {
              return [value, replaceValue]
            }
            return replaceValue
          },
        },
      ],
      true
    )
  ).toEqual({
    a: 2,
    b: [1, 2],
    c: 3,
  })
})
