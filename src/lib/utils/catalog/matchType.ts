export const matchType = (selectedType: string | number, itemType: string): boolean => {
  const normalizedSelectedType = selectedType.toString().toLowerCase()
  const normalizedItemType = itemType.toLowerCase()

  const typeMap: {[key: string]: string[]} = {
    '1 кв.': ['1 кв.', '1 st'],
    студия: ['студия', 'studio']
  }

  return (
    normalizedSelectedType === '' ||
    normalizedItemType === normalizedSelectedType ||
    (typeMap[normalizedSelectedType]?.includes(normalizedItemType) ?? false)
  )
}
