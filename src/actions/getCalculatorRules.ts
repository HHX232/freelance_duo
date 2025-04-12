export async function getCalculatorRules() {
  const res = await fetch(`${process.env.BACKEND_URL}/api/mortgage/rules`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
    cache: 'no-cache'
  })

  return await res.json()
}
