import { FC, useState, ReactNode, useMemo } from 'react'

import { ThemeContext } from './ThemeContext'

interface Props {
  children: ReactNode
}

export const ThemeProvider: FC<Props> = ({ children }) => {
  const [mainColor, setMainColor] = useState(ROUTE_THEMES.linkToPdf)
  const contextValue = useMemo(() => ({ mainColor, setMainColor }), [mainColor, setMainColor])
  return <ThemeContext.Provider value={contextValue}>{children}</ThemeContext.Provider>
}
