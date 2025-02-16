export async function createReservation(
  object_guid: string,
  name: string,
  surname: string,
  patronymic: string | undefined,
  born: string,
  passport_ser: string,
  passport_no: string,
  token: string
) {
  const res = await fetch(`${process.env.BACKEND_URL}/api/booking/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({object_guid, name, surname, patronymic, born, passport_ser, passport_no}),
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
