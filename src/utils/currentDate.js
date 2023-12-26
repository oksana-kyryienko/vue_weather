export function getCurrentDate() {
  const currentDate = new Date()
  const day = currentDate.getDate()
  const month = currentDate.toLocaleString('en-US', { month: 'short' })
  console.log(month)
  const translatedMonth = this.$t('data.shortMonths.' + month.toLowerCase())

  return `${day} ${translatedMonth}`
}
