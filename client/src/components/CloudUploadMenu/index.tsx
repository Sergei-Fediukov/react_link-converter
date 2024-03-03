import { forwardRef, ForwardRefRenderFunction, useContext, useEffect } from 'react'

import GoogleDriveIcon from 'src/assets/GoogleDrive'
import { GoogleApiContext } from 'src/context/googleApiContext/GoogleApiContext'
import { useGoogleDrive } from 'src/hooks/useGoogleDrive'

import styles from './style.module.scss'

interface Props {
  handleCloseList: () => void
  handleShowModal: () => void
}

export const CloudUploadMenu: ForwardRefRenderFunction<HTMLDivElement, Props> = ({ handleCloseList, handleShowModal }, ref) => {
  const { folderList } = useContext(GoogleApiContext)
  const { getGoogleDriveFolderList } = useGoogleDrive()

  useEffect(() => {
    if (folderList) {
      handleShowModal()
      handleCloseList()
    }
  }, [folderList, handleCloseList, handleShowModal])

  const handleClick = () => {
    getGoogleDriveFolderList()
  }

  return (
    <>
      <div ref={ref} className={styles.cloud_upload__item} role="button" tabIndex={0} onClick={handleClick}>
        <GoogleDriveIcon className={styles.cloud_upload__item_icon} />
        <span>Save to Google Drive</span>
      </div>
    </>
  )
}

export default forwardRef(CloudUploadMenu)
