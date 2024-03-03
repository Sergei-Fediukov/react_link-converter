export const getKeyByValue = (obj: Record<string, string>, value: string) => Object.keys(obj).filter((key: string) => obj[key] === value)
