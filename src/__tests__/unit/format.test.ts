import { formatTime } from '@/utils/format'

describe('Testing methods of the "format" module', () => {
  test('"formatTime" must pad with leading zeros when necessary', () => {
    const date = new Date('2023-07-15T15:05:00')
    const result = formatTime(date)
    expect(result).toBe('15:05')
  })
})
