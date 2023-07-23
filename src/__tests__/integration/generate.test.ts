import { generateUser } from '@/utils/generate'
import { idRegex, generatedNicknameRegex } from '@/utils/constants'

describe('Testing integrated methods of the "generate" module', () => {
  test('User ID and nickname must not be empty', () => {
    const user = generateUser()
    expect(user.id.length).toBeGreaterThan(0)
    expect(user.nickname.length).toBeGreaterThan(0)
  })

  test(`User ID must respect ${idRegex.source} regex and nickname must respect ${generatedNicknameRegex.source} regex`, () => {
    const user = generateUser()
    expect(user.id).toMatch(idRegex)
    expect(user.nickname).toMatch(generatedNicknameRegex)
  })
})
