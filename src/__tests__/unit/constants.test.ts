import { rules, information, nicknames } from '@/utils/constants'

describe('Constants', () => {
  test('Constants must not be empty', () => {
    expect(rules.length).toBeGreaterThan(0)
    expect(information.length).toBeGreaterThan(0)
    expect(nicknames.length).toBeGreaterThan(0)
  })
})
