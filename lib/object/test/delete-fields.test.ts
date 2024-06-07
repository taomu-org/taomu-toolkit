import { expect, test } from 'vitest'

import { deleteEmptyFields, deleteFieldsByValue } from '../delete-fields'

test('deleteEmptyFields', () => {
  expect(deleteEmptyFields({})).toEqual({})
  expect(deleteEmptyFields({ a: 1 })).toEqual({ a: 1 })
  expect(deleteEmptyFields({ a: 1, b: null, c: undefined, d: '' })).toEqual({ a: 1 })
  expect(deleteEmptyFields({ a: 1, b: 2, c: 3, d: '' })).toEqual({ a: 1, b: 2, c: 3 })
  expect(
    deleteEmptyFields(
      { a: 1, b: ' 2 ', c: { d: undefined, e: '', f: 'ok', g: [undefined, '', null, 'arr'] } },
      { deep: true, trimString: true }
    )
  ).toEqual({ a: 1, b: '2', c: { f: 'ok', g: ['arr'] } })
})

test('deleteFieldsByValue', () => {
  expect(deleteFieldsByValue({ a: 1, b: 2, c: 3, d: '', e: undefined, f: null }, new Set([1, 3, '']))).toEqual({
    b: 2,
    e: undefined,
    f: null,
  })
})
