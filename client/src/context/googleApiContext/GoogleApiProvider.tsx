import { FC, useState, ReactNode, useMemo } from 'react'

import { GoogleApiContext } from './GoogleApiContext'

interface Props {
  children: ReactNode
}

export const GoogleApiProvider: FC<Props> = ({ children }) => {
  const [authResponse, setAuthResponse] = useState(null)
  const [folderList, setFolderList] = useState(null)
  const [loginError, setLoginError] = useState(null)
  const [isLoggingIn, setIsLoggingIn] = useState(false)
  const [isUserDriveFileUpolad, setIsUserDriveFileUpolad] = useState(false)
  const contextValue = useMemo(
    () => ({
      authResponse,
      setAuthResponse,
      folderList,
      setFolderList,
      loginError,
      setLoginError,
      isLoggingIn,
      setIsLoggingIn,
      isUserDriveFileUpolad,
      setIsUserDriveFileUpolad
    }),
    [authResponse, folderList, loginError, isLoggingIn, isUserDriveFileUpolad]
  )
  return <GoogleApiContext.Provider value={contextValue}>{children}</GoogleApiContext.Provider>
}
