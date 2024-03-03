import { createContext } from 'react'

interface Props {
  authResponse: any
  setAuthResponse: React.Dispatch<React.SetStateAction<any>>
  folderList: any
  setFolderList: React.Dispatch<React.SetStateAction<any>>
  loginError: any
  setLoginError: React.Dispatch<React.SetStateAction<any>>
  isLoggingIn: boolean
  setIsLoggingIn: React.Dispatch<React.SetStateAction<boolean>>
  isUserDriveFileUpolad: boolean
  setIsUserDriveFileUpolad: React.Dispatch<React.SetStateAction<boolean>>
}

export const GoogleApiContext = createContext<Props | null>(null)
