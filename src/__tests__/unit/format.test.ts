import { formatTime } from '@/utils/format'

describe('Testing methods of the "format" module', () => {
  test('"formatTime" must pad with leading zeros when necessary', () => {
    const date = new Date('2023-07-15T15:05:00')
    const time = formatTime(date)
    expect(time).toBe('15:05')
  })

  test('"formatTime" must return the formatted time correctly', () => {
    const dateString = '2023-07-15T08:30:00'
    const time = formatTime(dateString)
    expect(time).toBe('08:30')
  })
})
