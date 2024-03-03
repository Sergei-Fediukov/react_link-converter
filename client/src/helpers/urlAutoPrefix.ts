export const autoPrefix = (value: string) => {
  const protocols = ['http', 'https']
  const httpInputString = `${protocols[0]}://`
  const httpsInputString = `${protocols[1]}://`
  const prefixes = Array.from({ length: httpsInputString.length }, (_, index) => httpsInputString.slice(0, index + 1))
  if (!value?.trim()) return ''
  if (prefixes.includes(value) || value.startsWith(httpsInputString)) return value
  if (value.startsWith(`${protocols[0]}:`)) return value.replace(`${protocols[0]}:`, `${protocols[1]}:`)
  if (value.startsWith(httpInputString)) return value.replace(httpInputString, httpsInputString)
  return `${httpsInputString}${value}`
}
