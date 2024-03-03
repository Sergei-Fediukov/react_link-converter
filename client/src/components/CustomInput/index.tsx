import { FC, useContext, useEffect, useState } from 'react'

import cn from 'classnames'
import { Field } from 'react-final-form'

import AnimatedSpinningArrows from 'src/assets/AnimatedSpinningArrows'
import { ThemeContext } from 'src/context/theme/ThemeContext'
import { autoPrefix } from 'src/helpers/urlAutoPrefix'

import styles from './style.module.scss'

export const CustomInput: FC<any> = ({ isSubmitting, handleButtonSubmit, valid, requestErrors }) => {
  const [isSubmittingBlocked, setIsSubmittingBlocked] = useState(false)
  const { mainColor } = useContext(ThemeContext)

  const handleClick = () => {
    setIsSubmittingBlocked(!valid)
  }

  const handleChange = (value: string) => {
    if (isSubmittingBlocked) {
      setIsSubmittingBlocked(false)
    }
    return autoPrefix(value)
  }

  useEffect(() => {
    setIsSubmittingBlocked(requestErrors)
  }, [requestErrors])

  return (
    <div className={styles.form__custom_input__wrapper}>
      <Field
        className={cn(styles.form__custom_input__inner, {
          [styles.common__hidden]: isSubmitting,
          [styles.common__active]: !isSubmitting,
          [styles.common__error]: isSubmittingBlocked
        })}
        component="input"
        format={autoPrefix}
        name="url"
        parse={handleChange}
        placeholder="https://example.com"
        type="text"
      />
      <div>
        <div
          className={cn(styles.form__custom_button, {
            [styles.form__custom_button__animation]: isSubmitting,
            [styles.pseudoBordersRotation]: isSubmitting,
            [styles.common__error]: isSubmittingBlocked
          })}
          role="button"
          tabIndex={0}
          onClick={valid ? handleButtonSubmit : handleClick}
        >
          <span>{isSubmitting ? <AnimatedSpinningArrows fill={mainColor} /> : 'GO!'}</span>
        </div>
      </div>
    </div>
  )
}
