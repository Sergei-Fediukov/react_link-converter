export const fileDownload = async (convertedData: any, type: string) => {
  console.log('\x1b[45m', '\x1b[30m', '------> type', type, '\x1b[0m')
  const url = `${API_BASE_URL}/${type}/${convertedData.file}`
  const response = await fetch(url)
  if (!response.ok) {
    console.error('Ошибка при получении файла:', response.status, response.statusText)
    return
  }
  const arrayBuffer = await response.arrayBuffer()
  const blob = new Blob([arrayBuffer])
  const objectUrl = window.URL.createObjectURL(blob)
  const link = document.createElement('a')

  link.href = objectUrl
  link.download = `${convertedData.resourceName || convertedData.file}`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  window.URL.revokeObjectURL(objectUrl)
}
