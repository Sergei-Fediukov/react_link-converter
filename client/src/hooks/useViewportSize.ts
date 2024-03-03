import { useState, useEffect, useCallback } from 'react'

const useViewportSize = () => {
  const [height, setHeight] = useState(0)
  const [width, setWidth] = useState(0)

  const paramSetter = useCallback(() => {
    setHeight(window.innerHeight)
    setWidth(window.innerWidth)
  }, [])

  useEffect(() => {
    window.addEventListener('resize', paramSetter)
    paramSetter()
    return () => {
      window.removeEventListener('resize', paramSetter)
    }
  }, [paramSetter])

  return { width, height }
}

export default useViewportSize
