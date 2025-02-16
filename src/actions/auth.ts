export async function AuthByPhone(phone: string) {
  const res = await fetch(`${process.env.BACKEND_URL}/api/auth/sms/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({phone}),
    cache: 'no-cache'
  })

  return await res.json()
}

export async function AuthByPhoneConfirm(phone: string, code: string) {
  const res = await fetch(`${process.env.BACKEND_URL}/api/auth/login/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({phone, code}),
    cache: 'no-cache'
  })

  return await res.json()
}
