import { useCallback, useEffect, useRef, useState } from 'react'

import cn from 'classnames'

import Dots from 'src/assets/Dots'
import CloudUploadMenu from 'src/components/CloudUploadMenu'
import { FolderPickerModal } from 'src/components/modals/FolderPickerModal'

import styles from './style.module.scss'

export const DotsButton = () => {
  const [showOptions, setShowOptions] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const dotsRef = useRef(null)
  const childRef = useRef(null)

  const handleOutsideClick = useCallback((e: MouseEvent) => {
    if (dotsRef.current && !dotsRef.current.contains(e.target)) {
      setShowOptions(false)
    }
  }, [])

  useEffect(() => {
    document.addEventListener('click', handleOutsideClick)
    return () => {
      document.removeEventListener('click', handleOutsideClick)
    }
  }, [handleOutsideClick])

  const handleOpenList = () => {
    setShowOptions(true)
  }

  const handleCloseList = useCallback(() => {
    setShowOptions(false)
  }, [])

  const handleShowModal = useCallback(() => {
    setShowModal(!showModal)
  }, [showModal, setShowModal])

  return (
    <div ref={dotsRef} className={styles.dots__wrapper} role="button" tabIndex={0} onClick={handleOpenList}>
      <Dots className={cn({ [styles.common__hidden]: showOptions })} />
      {showOptions && (
        <div className={styles.dots__list}>
          <CloudUploadMenu ref={childRef} handleCloseList={handleCloseList} handleShowModal={handleShowModal} />
        </div>
      )}
      {showModal && <FolderPickerModal handleShowModal={handleShowModal} />}
    </div>
  )
}
