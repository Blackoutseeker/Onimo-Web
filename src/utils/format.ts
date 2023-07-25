export const formatTime = (date: Date | string): string => {
  const formattedDate = new Date(date)

  const hours = formattedDate.getHours().toString().padStart(2, '0')
  const minutes = formattedDate.getMinutes().toString().padStart(2, '0')

  return `${hours}:${minutes}`
}

export const formatSendTimestamp = (date: Date): string => {
  const year = date.getFullYear().toString()
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const day = date.getDate().toString().padStart(2, '0')
  const hours = date.getHours().toString().padStart(2, '0')
  const minutes = date.getMinutes().toString().padStart(2, '0')
  const seconds = date.getSeconds().toString().padStart(2, '0')

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
}
