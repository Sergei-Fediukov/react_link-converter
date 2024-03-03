import { FC } from 'react'

import styles from './style.module.scss'
import { DotsButton } from '../DotsButton'

interface Props {
  handleFileDownload: () => Promise<void>
}

export const DownloadFileButton: FC<Props> = ({ handleFileDownload }) => {
  return (
    <div className={styles.downloadButton__wrapper}>
      <div className={styles.downloadButton__container}>
        <button className={styles.downloadButton} type="button" onClick={handleFileDownload}>
          Download the converted file
        </button>
        <DotsButton />
      </div>
    </div>
  )
}
