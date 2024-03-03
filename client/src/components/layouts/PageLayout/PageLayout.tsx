import { DetailedHTMLProps, FC, HTMLAttributes, useContext } from 'react'

// import { useGoogleLogin } from '@react-oauth/google'
// import Cookies from 'js-cookie'
// import useDrivePicker from 'react-google-drive-picker'
import { Outlet } from 'react-router-dom'

import { Footer } from 'src/components/layouts/Footer'
import { Header } from 'src/components/layouts/Header'
import { ThemeContext } from 'src/context/theme/ThemeContext'
// import { useGoogleApi } from 'src/hooks/useGoogleApi'

import styles from './style.module.scss'

// const GooglePicker: FC = () => {
//   const [openPicker] = useDrivePicker()

// const handleOpenPicker = () => {
//   gapi.load('client:auth2', () => {
//     gapi.client
//       .init({
//         apiKey: 'AIzaSyD7_rpN6dPxwX9AAPm25AOS8aTg4GMB1Hg'
//       })
//       .then(() => {
//         let tokenInfo = gapi.auth.getToken()
//         // const customViewsArray = [new google.picker.DocsView()]
//         const pickerConfig: any = {
//           clientId: '707501433017-avq11frboko6npfrp4d07rd67nibk2bh.apps.googleusercontent.com',
//           developerKey: 'AIzaSyD7_rpN6dPxwX9AAPm25AOS8aTg4GMB1Hg',
//           viewId: 'DOCS',
//           viewMimeTypes: 'image/jpeg,image/png,image/gif',
//           token: tokenInfo ? tokenInfo.access_token : null,
//           showUploadView: true,
//           showUploadFolders: true,
//           supportDrives: true,
//           multiselect: true,
//           disableDefaultView: true,
//           // customViews: customViewsArray
//           callbackFunction: (data: any) => {
//             const elements = Array.from(document.getElementsByClassName('picker-dialog') as HTMLCollectionOf<HTMLElement>)
//             for (let i = 0; i < elements.length; i += 1) {
//               elements[i].style.zIndex = '2000'
//             }
//             if (data.action === 'picked') {
//               // Add your desired workflow when choosing a file from the Google Picker popup
//               // In this below code, I'm attempting to get the file's information.
//               if (!tokenInfo) {
//                 tokenInfo = gapi.auth.getToken()
//               }
//               const fetchOptions = {
//                 headers: {
//                   Authorization: `Bearer ${tokenInfo.access_token}`
//                 }
//               }
//               const driveFileUrl = 'https://www.googleapis.com/drive/v3/files'
//               data.docs.map(async (item: any) => {
//                 await fetch(`${driveFileUrl}/${item.id}?alt=media`, fetchOptions)
//               })
//             }
//           }
//         }
//         openPicker(pickerConfig)
//       })
//   })
// }

//   return (
//     <div>
//       <button color="primary" type="button" onClick={() => handleOpenPicker()}>
//         Open Google Picker
//       </button>
//     </div>
//   )
// }
export const PageLayout: FC = () => {
  // ; (() => {
  //   // Устанавливаем cookie с атрибутом SameSite=None и Secure
  //   Cookies.set('my_cookie', 'my_value', { sameSite: 'None', secure: true })
  // })()
  // const { getUserDriveFolderList, userDriveFileUpolad } = useGoogleApi()

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

  const { mainColor } = useContext(ThemeContext)
  return (
    <div className={styles.page_layout__wrapper} style={{ '--main-color': mainColor } as DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>}>
      <Header />
      <div className={styles.page_outlet_wrapper}>
        <Outlet />
      </div>
      {/* <button onClick={handleLogoutSuccess}>Logout</button> */}
      {/* <GooglePicker /> */}
      {/* <button type="button" onClick={() => login()}>
        Sign in with Google 🚀
      </button> */}
      <Footer />
    </div>
  )
}
