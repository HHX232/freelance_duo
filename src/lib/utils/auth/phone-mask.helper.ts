export const formatPhoneNumber = (value: string) => {
  const cleaned = value.replace(/\D/g, '')

  if (cleaned.length === 0) {
    return ''
  }

  let start = cleaned.startsWith('7') ? cleaned : '7' + cleaned

  start = start.substring(0, 11)
  const match = start.match(/^(\d{1})(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})$/)

  if (match) {
    return `+${match[1]} (${match[2]}${match[3] ? ') ' : ''}${match[3]}${match[4] ? '-' : ''}${match[4]}${match[5] ? '-' : ''}${match[5]}`
  }

  return '+7'
}
