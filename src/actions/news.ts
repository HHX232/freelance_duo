export async function getNews() {
  const res = await fetch(`${process.env.BACKEND_URL}/api/news/`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
    cache: 'no-cache'
  })

  return await res.json()
}

export async function getNewsBySlug(slug: string) {
  const res = await fetch(`${process.env.BACKEND_URL}/api/news/slug/${slug}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
    cache: 'no-cache'
  })

  return await res.json()
}

export async function getNewsById(id: number[]) {
  const res = await fetch(`${process.env.BACKEND_URL}/api/news/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({data_id: id}),
    cache: 'no-cache'
  })

  return await res.json()
}
