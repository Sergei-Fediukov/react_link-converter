import { FC, useState, ReactNode, useMemo } from 'react'

import { ConvertedDataContext } from './ConvertedDataContext'

interface Props {
  children: ReactNode
}

// const commonOptions = {
//   isFileNameHostName: true
// }

const pdfOptions = {
  // Set the PDF margins.
  margins: { top: 10, bottom: 10, left: 10, right: 10 },
  // Set to `true` to print background graphics.
  printBackground: true,
  // Timeout in milliseconds. Pass 0 to disable timeout. (<= 30 000)
  timeout: 0,
  // Whether to print in landscape orientation. (vertical = false, horizontal = true)
  landscape: false,
  // Scales the rendering of the web page. Amount must be between 0.1 and 2.
  scale: 1
}

const initialOptions = {
  link: {
    PDF: {
      type: 'PDF',
      ...pdfOptions
    },
    IMAGE: {
      type: 'JPG'
    },
    TXT: {
      type: 'TXT',
      ...pdfOptions
    },
    HTML: {
      type: 'HTML',
      ...pdfOptions
    },
    AUDIO: {
      type: 'MP3'
    }
  }
}

export const ConvertedDataProvider: FC<Props> = ({ children }) => {
  const [convertedData, setConvertedData] = useState(null)
  const [requestErrors, setRequestErrors] = useState([])
  const [convertDataOptions, setConvertDataOptions] = useState(initialOptions)
  const contextValue = useMemo(
    () => ({ convertedData, setConvertedData, convertDataOptions, setConvertDataOptions, requestErrors, setRequestErrors }),
    [convertedData, setConvertedData, convertDataOptions, setConvertDataOptions, requestErrors, setRequestErrors]
  )
  return <ConvertedDataContext.Provider value={contextValue}>{children}</ConvertedDataContext.Provider>
}
