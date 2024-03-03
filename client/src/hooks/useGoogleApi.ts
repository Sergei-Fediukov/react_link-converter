import { useState } from 'react'

import { useGoogleLogin } from '@react-oauth/google'

import { get, post } from 'src/api'

export const useGoogleApi = (): any => {
  const getUserDriveFolderList = async (accessToken: string) => {
    const url = 'https://www.googleapis.com/drive/v3/files'
    const params = {
      q: "'root' in parents and mimeType = 'application/vnd.google-apps.folder'"
    }
    const queryString = new URLSearchParams(params).toString()
    const options = {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }
    try {
      return await get(`${url}?${queryString}`, options)
    } catch (error) {
      console.error(error)
    }
  }

  const userDriveFileUpolad = async (accessToken: string, fileURL: string, fileName: string, folderId?: string) => {
    try {
      const fileBlob = await get(fileURL, { responseType: 'blob' })
      const formData = new FormData()
      const metadata = folderId
        ? {
            name: fileName,
            parents: [folderId]
          }
        : {
            name: fileName
          }
      formData.append('metadata', new Blob([JSON.stringify(metadata)], { type: 'application/json' }))
      formData.append('file', fileBlob, 'имя_файла.pdf')
      const url = 'https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart'
      const options = {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }
      return await post(url, formData, options)
    } catch (error) {
      console.log(error)
    }
  }
  // const login = useGoogleLogin({
  //   onSuccess: async (tokenResponse) => {
  //     const data = await getUserDriveFolderList(tokenResponse.access_token)
  //     console.error('getUserDriveFolderList', data)
  //     const data2 = await userDriveFileUpolad(tokenResponse.access_token, 'http://[::1]:3145/PDF/d007e9ef-11d1-40a8-b43e-8bc98a3de09f.pdf', '1ChGG-PhYNk8uwfIYPFKlgyd8FGKCFv6W')
  //     console.error('userDriveFileUpolad', data2)
  //   },
  //   prompt: 'select_account',
  //   flow: 'implicit',
  //   scope: 'https://www.googleapis.com/auth/drive https://www.googleapis.com/auth/drive.file' // Добавляем разрешение для работы с файлами
  // })

  // const googleAccountLogin = () => {
  const [tokenResponse, setTokenResponse] = useState(null)

  const googleAccountLogin = useGoogleLogin({
    onSuccess: (response) => {
      setTokenResponse(response)
      console.log(tokenResponse)
    },
    prompt: 'select_account',
    flow: 'implicit',
    scope: 'https://www.googleapis.com/auth/drive https://www.googleapis.com/auth/drive.file'
  })

  return { getUserDriveFolderList, userDriveFileUpolad, googleAccountLogin }
}
