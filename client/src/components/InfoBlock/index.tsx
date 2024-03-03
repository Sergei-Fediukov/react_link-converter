import { FC, useContext } from 'react'

import cn from 'classnames'

import Chain from 'src/assets/AnimatedChain'
import Download from 'src/assets/AnimatedDownload'
import MagicWand from 'src/assets/AnimatedMagicWand'
import { ThemeContext } from 'src/context/theme/ThemeContext'

import styles from './style.module.scss'

interface Props {
  title: string
}

export const InfoBlock: FC<Props> = ({ title }) => {
  const { mainColor } = useContext(ThemeContext)

  return (
    <div key={title} className={styles.info_block__wrapper}>
      <div className={cn(styles.animationGradualAppearance, styles.animationDelay_025, styles.info_block__item)}>
        <Chain fill={mainColor} />
        <span>{`Enter web page URL to convert into ${title}`}</span>
      </div>
      <div className={cn(styles.animationGradualAppearance, styles.animationDelay_025, styles.info_block__item)}>
        <MagicWand fill={mainColor} />
        <span>Press "Enter" and start the magic!</span>
      </div>
      <div className={cn(styles.animationGradualAppearance, styles.animationDelay_05, styles.info_block__item)}>
        <Download fill={mainColor} />
        <span>Download the result in seconds!</span>
      </div>
    </div>
  )
}
