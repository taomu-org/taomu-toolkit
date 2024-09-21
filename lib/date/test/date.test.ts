import { expect, test } from 'vitest'

import { transformToDateType, formatDateToString, formatTimeToString } from '..'

test('transformToDateType', () => {
  expect(transformToDateType('2024-04-01 12:50:41')).toBeInstanceOf(Date)
})

test('formatDateToString', () => {
  expect(formatDateToString()).toBeTypeOf('string')
  // 以下用例在 github actions 可能存在市区不一致的问题 需要在 workflow 中设置时区
  expect(formatDateToString('Mon Apr 01 2024 12:50:41 GMT+0800 (香港标准时间)')).toBe('2024-04-01 12:50:41')
  expect(formatDateToString('Mon Apr 01 2024 12:50:41 GMT+0800 (香港标准时间)', 'YYYY-MM-DD HH:mm:ss.ms')).toBe(
    '2024-04-01 12:50:41.000'
  )
  expect(formatDateToString('Mon Apr 01 2024 12:50:41 GMT+0800 (香港标准时间)', 'YYYY-MM-DD')).toBe('2024-04-01')
  expect(formatDateToString('2024-04-01 12:50:41', 'YYYY-MM-DD')).toBe('2024-04-01')
  expect(formatDateToString('2024-04-01 12:50:41', 'YYYY年MM月DD日')).toBe('2024年04月01日')
  expect(formatDateToString(1711946982822)).toBe('2024-04-01 12:49:42')
  expect(formatDateToString(new Date(1711946982822))).toBe('2024-04-01 12:49:42')
})

test('formatTimeToString', () => {
  expect(formatTimeToString(3000)).toBe('3秒')
  expect(formatTimeToString(60000)).toBe('1分钟')
  expect(formatTimeToString(5000000)).toBe('1小时23分钟20秒')
  expect(formatTimeToString(50000000)).toBe('13小时53分钟20秒')
  expect(formatTimeToString(500000000)).toBe('5天18小时53分钟20秒')
  expect(formatTimeToString(500000000, 'DD{Day} HH{Hour} mm{Minute} ss{Second}')).toBe('5Day 18Hour 53Minute 20Second')
})
