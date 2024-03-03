import { createContext } from 'react'

interface ThemeContextProps {
  mainColor: string
  setMainColor: React.Dispatch<React.SetStateAction<string>>
}

export const ThemeContext = createContext<ThemeContextProps | null>(null)
