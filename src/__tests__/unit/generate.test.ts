import { generateId } from '@/utils/generate'

const checkIfRespectRegex = (text: string, regex: RegExp): boolean => {
  const matchRegex: boolean = RegExp(regex.source).test(text)
  return matchRegex
}

const idRegex: RegExp = /^[a-zA-Z0-9]+$/g

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
    expect(checkIfRespectRegex(generateId(), idRegex)).toBeTruthy()
  })
})
