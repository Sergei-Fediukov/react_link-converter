import { FC, useState, ReactNode, useMemo } from 'react'

import { SubmittingDisableContext } from './SubmittingDisableContext'

interface Props {
  children: ReactNode
}

export const SubmittingDisableProvider: FC<Props> = ({ children }) => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const contextValue = useMemo(() => ({ isSubmitting, setIsSubmitting }), [isSubmitting, setIsSubmitting])
  return <SubmittingDisableContext.Provider value={contextValue}>{children}</SubmittingDisableContext.Provider>
}
