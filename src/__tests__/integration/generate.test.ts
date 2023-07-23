import { generateUser } from '@/utils/generate'

describe('Testing integrated methods of the "generate" module', () => {
  test('User ID and nickname must not be empty', () => {
    const user = generateUser()
    expect(user.id.length).toBeGreaterThan(0)
    expect(user.nickname.length).toBeGreaterThan(0)
  })
})
