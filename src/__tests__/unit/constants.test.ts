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

const checkIfRespectRegex = (list: string[], regex: RegExp): boolean => {
  for (const item of list) {
    const notMatchRegex: boolean = !RegExp(regex.source).test(item)
    if (notMatchRegex) return false
  }

  return true
}

const nicknamesRegex: RegExp = /^[a-z]+_[a-z]+$/g

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

  test(`Nicknames must respect the ${nicknamesRegex.source} regex`, () => {
    expect(checkIfRespectRegex(nicknames, nicknamesRegex)).toBeTruthy()
  })
})
