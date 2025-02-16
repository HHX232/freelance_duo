export async function getFlatsAll() {
  try {
    const res = await fetch(`${process.env.BACKEND_URL}/api/flats/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      cache: 'no-cache'
    })
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`)
    }
    return await res.json()
  } catch (error) {
    console.error('Fetch failed:', error)
    throw error
  }
}

export async function getFlatsById(id: string[]) {
  const res = await fetch(`${process.env.BACKEND_URL}/api/flats/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({data_id: id}),
    cache: 'no-cache'
  })

  return await res.json()
}

export async function getFlatsByGuid(id: string[]) {
  const res = await fetch(`${process.env.BACKEND_URL}/api/flats/guid/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({data_guid: id}),
    cache: 'no-cache'
  })

  return await res.json()
}

export async function getRecomended(types: string[]) {
  const res = await fetch(`${process.env.BACKEND_URL}/api/flats/recomended/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({data_types: types}),
    cache: 'no-cache'
  })

  return await res.json()
}

export async function getReservation(guid: string, fvalue: string, fprice: string) {
  const res = await fetch(`${process.env.BACKEND_URL}/api/flats/check_booking/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({flat_guid: guid, Fvalue: fvalue, Fprice: fprice}),
    cache: 'no-cache'
  })

  return await res.json()
}

export async function getPdf(requestBody: Record<string, unknown>): Promise<{pdf_path: string}> {
  try {
    const response = await fetch(`${process.env.BACKEND_URL}/api/flats/pdf/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    })

    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.statusText}`)
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error while downloading the file:', error)
    throw error
  }
}
