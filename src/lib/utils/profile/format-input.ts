export const formatDateString = (value: string | undefined): string => {
  if (!value) return ''

  const cleaned = value.replace(/\D/g, '')
  const day = cleaned.substring(0, 2)
  const month = cleaned.substring(2, 4)
  const year = cleaned.substring(4, 8)

  let formattedValue = ''
  if (day) formattedValue += day
  if (month) formattedValue += '-' + month
  if (year) formattedValue += '-' + year

  return formattedValue
}

export const isValidDate = (value: string): boolean => {
  const cleaned = value.replace(/\D/g, '')
  if (cleaned.length !== 8) return false

  const day = parseInt(cleaned.substring(0, 2), 10)
  const month = parseInt(cleaned.substring(2, 4), 10) - 1
  const year = parseInt(cleaned.substring(4, 8), 10)

  const date = new Date(year, month, day)
  if (date.getFullYear() !== year || date.getMonth() !== month || date.getDate() !== day) {
    return false
  }

  const currentDate = new Date()
  const earliestDate = new Date(currentDate.getFullYear() - 120, currentDate.getMonth(), currentDate.getDate())
  const latestDate = new Date(currentDate.getFullYear() - 18, currentDate.getMonth(), currentDate.getDate())

  if (date < earliestDate || date > latestDate) {
    return false
  }

  return true
}

export const isValidDigit = (value: string, mask: string): boolean => {
  if (!value) return true
  const regexPattern = mask.replace(/X/g, '\\d').replace(/-/g, '\\-').replace(/\s/g, '\\s')

  const regex = new RegExp(`^${regexPattern}$`)
  return regex.test(value)
}

export const formatInputValue = (value: string, mask: string): string => {
  const cleaned = value.replace(/\D/g, '')
  let formattedValue = ''
  let maskIndex = 0

  for (let i = 0; i < cleaned.length; i++) {
    while (mask[maskIndex] && mask[maskIndex] !== 'X') {
      formattedValue += mask[maskIndex]
      maskIndex++
    }
    if (!mask[maskIndex]) break
    formattedValue += cleaned[i]
    maskIndex++
  }

  return formattedValue
}
