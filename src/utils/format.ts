export const formatTime = (date: Date | string): string => {
  const formattedDate = new Date(date)

  const hours = formattedDate.getHours().toString().padStart(2, '0')
  const minutes = formattedDate.getMinutes().toString().padStart(2, '0')

  return `${hours}:${minutes}`
}
