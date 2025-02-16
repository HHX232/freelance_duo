export async function getProgressById(id: string) {
  const res = await fetch(`${process.env.BACKEND_URL}/api/building_plans/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({id: id}),
    cache: 'no-cache'
  })

  return await res.json()
}

export async function getAllProgress() {
  const res = await fetch(`${process.env.BACKEND_URL}/api/building_plans/`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
    cache: 'no-cache'
  })

  return await res.json()
}
