import { useContext, useEffect } from 'react'

import { useLocation } from 'react-router-dom'

import { InputForm } from 'src/components/forms/InputForm'
import { ThemeContext } from 'src/context/theme/ThemeContext'
import { getKeyByValue } from 'src/helpers/getKeyByValue'
import { setPageTitle } from 'src/helpers/setPagetitle'

const CommonLinkPage = () => {
  const { mainColor, setMainColor } = useContext(ThemeContext)
  const { pathname } = useLocation()
  const title = pathname.split('/').pop().toUpperCase() || 'PDF'

  useEffect(() => {
    setMainColor(ROUTE_THEMES[getKeyByValue(PUBLIC_ROUTES, pathname)[0]])
  }, [mainColor, setMainColor, pathname])

  setPageTitle(`LINK to ${title}`)

  return (
    <main>
      <InputForm title={title} />
    </main>
  )
}

export default CommonLinkPage
