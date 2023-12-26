export function getCurrentDate() {
  const currentDate = new Date()
  const day = currentDate.getDate()
  const month = currentDate.toLocaleString('default', { month: 'short' })
const translatedMonth = this.$t('data.shortMonths.' + month.toLowerCase())

  return `${day} ${translatedMonth}`
}

