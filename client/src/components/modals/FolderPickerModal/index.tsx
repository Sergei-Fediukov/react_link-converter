import { FC, useContext } from 'react'

import { createPortal } from 'react-dom'

import { GoogleDriveFolderPicker } from 'src/components/GoogleDriveFolderPicker'
import { ModalLayout } from 'src/components/layouts/ModalLayout'
import { GoogleApiContext } from 'src/context/googleApiContext/GoogleApiContext'

interface Props {
  handleShowModal: () => void
  // data: { [id: string]: Folder }
}

export const FolderPickerModal: FC<Props> = ({ handleShowModal }) => {
  // const [maxDepth, setMaxDepth] = useState<number>(5)
  // const maxDepth = 5

  // // Найти максимальную глубину вложенности
  // useEffect(() => {
  //   console.log('\x1b[45m', '\x1b[30m', '------> maxDepth', maxDepth, '\x1b[0m')
  //   const findMaxDepth = (folders: Folder[], depth: number) => {
  //     let max = depth
  //     folders.forEach((folder) => {
  //       if (folder.subFolders.length > 0) {
  //         const subMax = findMaxDepth(folder.subFolders, depth + 1)
  //         if (subMax > max) {
  //           max = subMax
  //         }
  //       }
  //     })
  //     return max
  //   }
  //   const depth = findMaxDepth(Object.values(data), 1)
  //   setMaxDepth(depth)
  // }, [data])
  const { setAuthResponse, setFolderList, setLoginError } = useContext(GoogleApiContext)

  const handleResetPickerRequests = () => {
    handleShowModal()
    setAuthResponse(null)
    setFolderList(null)
    setLoginError(null)
  }

  return (
    <>
      {createPortal(
        <ModalLayout handleShowModal={handleResetPickerRequests}>
          <GoogleDriveFolderPicker handleShowModal={handleResetPickerRequests} />
        </ModalLayout>,
        document.getElementById('folder-picker-modal')!
      )}
    </>
  )
}

export default FolderPickerModal
