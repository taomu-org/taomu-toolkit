import { expect, test } from 'vitest'

import { parseEnumToOptions } from '../enum'

test('parseEnumToOptions', () => {
  enum TestEnum {
    A,
    B,
    C,
  }
  expect(parseEnumToOptions(TestEnum)).toEqual([
    { label: 'A', value: 0 },
    { label: 'B', value: 1 },
    { label: 'C', value: 2 },
  ])

  enum TestEnum2 {
    A = 1,
    B = '3',
    C = 'c-value',
  }
  expect(parseEnumToOptions(TestEnum2)).toEqual([
    { label: 'A', value: 1 },
    { label: 'B', value: '3' },
    { label: 'C', value: 'c-value' },
  ])
  expect(parseEnumToOptions(TestEnum2, ['B'])).toEqual([
    { label: 'A', value: 1 },
    { label: 'C', value: 'c-value' },
  ])
})
