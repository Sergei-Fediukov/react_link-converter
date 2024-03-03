import { FC } from 'react'

import cn from 'classnames'

import useViewportSize from 'src/hooks/useViewportSize'

import styles from './style.module.scss'

const MEDIUM_WEIGHT = 768

interface Props {
  handleShowModal: () => void
  children: React.ReactNode
}
export const ModalLayout: FC<Props> = ({ handleShowModal, children }) => {
  const { width } = useViewportSize()
  const isSmallWeight = width <= MEDIUM_WEIGHT

  return (
    <div className={styles.substrate} role="presentation" onClick={handleShowModal}>
      <div className={cn(styles.modal, isSmallWeight ? styles.modal__fullWidth : styles.modal__halfWidth, styles.uppercase)} role="presentation" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  )
}
