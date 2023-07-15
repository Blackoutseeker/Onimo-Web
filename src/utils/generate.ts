const chars = Array.from(Array(26), (_, i) => String.fromCharCode(65 + i))
  .concat(Array.from(Array(26), (_, i) => String.fromCharCode(97 + i)))
  .concat(Array.from(Array(10), (_, i) => String.fromCharCode(48 + i)))

export const generateId = (length: number = 12): string => {
  let id: string = ''

  for (let index = 0; index < length; index++) {
    const randomIndex = Math.floor(Math.random() * chars.length)
    const randomChar = chars[randomIndex]
    id += randomChar
  }

  return id
}
