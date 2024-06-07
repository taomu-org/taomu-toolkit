import { expect, test } from 'vitest'

import { uuid, formatAmount, formatAmountWithPrefix, formatIdCardNo, formatPhoneNo344 } from '..'

test('uuid', () => {
  const t1 = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
  const t2 = 'id-xxxx-xxxx'
  expect(uuid()).toBeTypeOf('string')
  expect(uuid(t1)).lengthOf(t1.length)
  expect(uuid(t2)).lengthOf(t2.length)
})

test('formatAmount', () => {
  expect(formatAmount()).toBe('0.00')
  expect(formatAmount(NaN)).toBe('0.00')
  expect(formatAmount(null)).toBe('0.00')
  expect(formatAmount(undefined)).toBe('0.00')
  expect(formatAmount(0)).toBe('0.00')
  expect(formatAmount('')).toBe('0.00')
  expect(formatAmount('not-number')).toBe('0.00')

  expect(formatAmount(1000)).toBe('1000.00')
  expect(formatAmount(10000)).toBe('10000.00')
  expect(formatAmount(100000)).toBe('100,000.00')
  expect(formatAmount('99999999.99')).toBe('99,999,999.99')
  expect(formatAmount(999999999999999)).toBe('999,999,999,999,999.00')
})

test('formatAmountWithPrefix', () => {
  expect(formatAmountWithPrefix()).toBe('¥0.00')
  expect(formatAmountWithPrefix(0, 2, '$')).toBe('$0.00')
  expect(formatAmountWithPrefix(1000)).toBe('¥1000.00')
  expect(formatAmountWithPrefix(100000)).toBe('¥100,000.00')
})

test('formatIdCardNo', () => {
  expect(formatIdCardNo()).toBe('')
  expect(formatIdCardNo('111111111111111111')).toBe('111111 11111111 1111')
  expect(formatIdCardNo('111111111111111111', '$1-$2-$3-$4-$5-$6')).toBe('111111-1111-11-11-111-1')
  expect(formatIdCardNo('11111111111111111x', '$1-$2-$3-$4-$5-$6')).toBe('111111-1111-11-11-111-x')
  expect(formatIdCardNo('11111111111111111X', '$1-$2-$3-$4-$5-$6')).toBe('111111-1111-11-11-111-X')
})

test('formatPhoneNo344', () => {
  expect(formatPhoneNo344()).toBe('')
  expect(formatPhoneNo344('11111111111')).toBe('111 1111 1111')
})
