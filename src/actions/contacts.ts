export async function sendCallTouch(phone: string, name: string, time: string, sessionID: string) {
  const res = await fetch(`${process.env.BACKEND_URL}/api/calltouch/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({phone, name, time, sessionID}),
    cache: 'no-cache'
  })

  return await res.json()
}

export async function sendCallBack(phone: string, name: string, sessionID: string, comment?: string) {
  const res = await fetch(`${process.env.BACKEND_URL}/api/mail/feedback/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({phone, name, message: comment, sessionID}),
    cache: 'no-cache'
  })

  return await res.json()
}
