export function getCurrentDate() {
  const currentDate = new Date()
  const day = currentDate.getDate()
  const month = currentDate.toLocaleString('default', { month: 'short' })
  return `${day} ${month}`
}