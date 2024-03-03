import { createContext } from 'react'

interface Props {
  convertedData: any
  setConvertedData: React.Dispatch<React.SetStateAction<boolean>>
  convertDataOptions: any
  setConvertDataOptions: React.Dispatch<React.SetStateAction<any>>
  requestErrors: any[]
  setRequestErrors: React.Dispatch<React.SetStateAction<any>>
}

export const ConvertedDataContext = createContext<Props | null>(null)
