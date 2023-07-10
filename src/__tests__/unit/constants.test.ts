import { rules, information, nicknames } from '@/utils/constants'

const checkDuplication = (list: string[]): boolean => {
  for (const item of list) {
    const duplicationOccurrences: number = list.filter(
      itemFromFilter => itemFromFilter.toLowerCase() === item.toLowerCase()
    ).length

    if (duplicationOccurrences > 1) {
      return true
    }
  }

  return false
}

describe('Constants', () => {
  test('Constants must not be empty', () => {
    expect(rules.length).toBeGreaterThan(0)
    expect(information.length).toBeGreaterThan(0)
    expect(nicknames.length).toBeGreaterThan(0)
  })

  test('Constants must not be duplicated', () => {
    expect(checkDuplication(rules)).toBeFalsy()
    expect(checkDuplication(information)).toBeFalsy()
    expect(checkDuplication(nicknames)).toBeFalsy()
  })
})
