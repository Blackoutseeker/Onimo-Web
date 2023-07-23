import {
  generateId,
  generateNickname,
  generateExpirationDate
} from '@/utils/generate'
import { idRegex, generatedNicknameRegex } from '@/utils/constants'

describe('Testing methods of the "generate" module', () => {
  test('"generateId" must not return an empty string', () => {
    const id = generateId()
    expect(id.length).toBeGreaterThan(0)
  })

  test('"generateId" must use length provided via argument', () => {
    const idLength = Math.floor(Math.random() * 30) + 1
    const id = generateId(idLength)
    expect(id.length).toBe(idLength)
  })

  test(`ID must respect the ${idRegex.source} regex`, () => {
    const id = generateId()
    expect(id).toMatch(idRegex)
  })

  test(`The nickname generated must respect the ${generatedNicknameRegex.source} regex`, () => {
    const nickname = generateNickname()
    expect(nickname).toMatch(generatedNicknameRegex)
  })

  test('"getExpirationDate" must return a date greater than the current date', () => {
    const expirationDate = generateExpirationDate()
    const currentDate = new Date()
    expect(expirationDate.getTime()).toBeGreaterThan(currentDate.getTime())
  })
})
