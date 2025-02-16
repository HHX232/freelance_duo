export async function GetProfile(token: string | null) {
  const res = await fetch(`${process.env.BACKEND_URL}/api/auth/user/`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    cache: 'no-cache'
  })

  if (res.status === 401) {
    throw new Error('Unauthorized')
  }

  const data = await res.json()

  // if (!res.ok || !data.success) {
  //   throw new Error(data.message || 'Failed to fetch profile')
  // }

  return data
}

export async function UpdateProfile(
  token: string | null,
  data: {surname: string; name: string; email?: string; phone: string}
) {
  const res = await fetch(`${process.env.BACKEND_URL}/api/auth/user/`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(data),
    cache: 'no-cache'
  })

  return await res.json()
}
