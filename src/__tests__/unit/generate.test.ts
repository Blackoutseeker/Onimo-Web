import { generateId } from '@/utils/generate'

describe('Testing methods of the "generate" module', () => {
  test('"generateId" must not return an empty string', () => {
    const id = generateId()
    expect(id.length).toBeGreaterThan(0)
  })
})
