const ORIGIN = 'https://kronfort-back.labab.ru'

export const getData = async <Response>(endpoint: string, withError = true) => {
  const res = await fetch(`${ORIGIN}/api/${endpoint}`, {
    next: {revalidate: 60}
  })

  if (!res.ok && withError) {
    throw new Error('Failed to fetch data')
  }

  return (await res.json()) as Response
}
