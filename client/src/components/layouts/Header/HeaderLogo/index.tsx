import { useContext } from 'react'

import cn from 'classnames'
import { useNavigate } from 'react-router-dom'

import Logo from 'src/assets/Logo'
import { SubmittingDisableContext } from 'src/context/submittingDisable/SubmittingDisableContext'
import { ThemeContext } from 'src/context/theme/ThemeContext'

import styles from './style.module.scss'

export const HeaderLogo = () => {
  const { mainColor } = useContext(ThemeContext)
  const { isSubmitting } = useContext(SubmittingDisableContext)

  const navigate = useNavigate()

  const handleClick = () => {
    if (!isSubmitting) {
      navigate('/')
    }
  }

  return (
    <div className={styles.logo__wrapper}>
      <Logo className={cn(styles.logo, { [styles.logo__disabled]: isSubmitting })} fill={mainColor} onClick={handleClick} />
    </div>
  )
}
