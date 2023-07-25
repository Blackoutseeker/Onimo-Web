import { formatTime } from '@/utils/format'

const timeRegex: RegExp = /^(0\d|1\d|2[0-3]):[0-5]\d$/g

describe('Testing methods of the "format" module', () => {
  test('"formatTime" must pad with leading zeros when necessary', () => {
    const date = new Date('2023-07-15T15:05:00')
    const time = formatTime(date)
    expect(time).toBe('15:05')
    expect(time).toMatch(timeRegex)
  })

  test(`"formatTime" must respect ${timeRegex.source} regex`, () => {
    const dateString = '2023-07-15T08:30:00'
    const time = formatTime(dateString)
    expect(time).toMatch(timeRegex)
  })
})
