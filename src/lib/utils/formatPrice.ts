// @ts-strict-ignore
export const formatPrice = (price: number | undefined, style = `currency`, returnNumber?: boolean): number | string => {
  if (price === undefined || isNaN(price)) return `не указана`

  if (returnNumber) {
    return (price / 1000000).toFixed(1).replace('.', ',').replace(`₽`, ``)
  }

  return price.toLocaleString(`ru-RU`, {
    style,
    currency: `RUB`,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  })
}
