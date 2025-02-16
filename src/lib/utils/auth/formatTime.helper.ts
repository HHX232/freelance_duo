export const formatTimeHelper = (seconds: number | undefined): string => {
  if (seconds === undefined) {
    return '00:00'
  }

  const minutes = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
}
