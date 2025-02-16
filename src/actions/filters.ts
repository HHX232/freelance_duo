export async function getFilters() {
  const res = await fetch(`${process.env.BACKEND_URL}/api/filters/flats/`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
    cache: 'no-cache'
  })

  return await res.json()
}
