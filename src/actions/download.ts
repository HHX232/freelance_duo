export async function downloadFile(url: string, requestBody: Record<string, unknown>): Promise<void> {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    })

    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.statusText}`)
    }

    const disposition = response.headers.get('content-disposition')
    let filename = 'kronfort.pdf'

    if (disposition && disposition.indexOf('attachment') !== -1) {
      const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/
      const matches = filenameRegex.exec(disposition)

      if (matches != null && matches[1]) {
        filename = matches[1].replace(/['"]/g, '')
      }
    }

    const blob = await response.blob()
    const urlBlob = window.URL.createObjectURL(new Blob([blob]))
    const link = document.createElement('a')
    link.href = urlBlob
    link.setAttribute('download', filename)

    document.body.appendChild(link)
    link.click()
    if (link.parentNode) {
      link.parentNode.removeChild(link)
    }
  } catch (error) {
    console.error('Error while downloading the file:', error)
  }
}
