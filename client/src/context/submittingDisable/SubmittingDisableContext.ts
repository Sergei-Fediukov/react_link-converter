import { createContext } from 'react'

interface SubmittingDisableProps {
  isSubmitting: boolean
  setIsSubmitting: React.Dispatch<React.SetStateAction<boolean>>
}

export const SubmittingDisableContext = createContext<SubmittingDisableProps | null>(null)
