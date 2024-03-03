import { useState, useRef, useEffect, useContext } from 'react'

import cn from 'classnames'
import { useLocation, NavLink, Link } from 'react-router-dom'

import { SubmittingDisableContext } from 'src/context/submittingDisable/SubmittingDisableContext'

import styles from './style.module.scss'

export const Footer = () => {
  const { isSubmitting } = useContext(SubmittingDisableContext)
  const initialState = {
    isLinkConverterNavigation: false,
    isHTMLConverterNavigation: false,
    isPDFConverterNavigation: false
  }
  const [state, setState] = useState(initialState)
  const navigationLinkChildRef = useRef(null)
  const navigationLinkParentRef = useRef(null)

  const navigationHtmlChildRef = useRef(null)
  const navigationHtmlParentRef = useRef(null)
  const { pathname } = useLocation()

  const handleLinkClick = () => {
    if (!isSubmitting) setState((prevState) => ({ ...initialState, isLinkConverterNavigation: !prevState.isLinkConverterNavigation }))
  }

  const handleHTMLClick = () => {
    if (!isSubmitting) setState((prevState) => ({ ...initialState, isHTMLConverterNavigation: !prevState.isHTMLConverterNavigation }))
  }

  const handleOutsideClick = (e: MouseEvent) => {
    if (
      navigationLinkChildRef.current &&
      !navigationLinkChildRef.current.contains(e.target) &&
      navigationHtmlChildRef.current &&
      !navigationHtmlChildRef.current.contains(e.target) &&
      navigationLinkParentRef.current &&
      !navigationLinkParentRef.current.contains(e.target) &&
      navigationHtmlParentRef.current &&
      !navigationHtmlParentRef.current.contains(e.target)
    ) {
      setState(initialState)
    }
  }

  useEffect(() => {
    document.addEventListener('click', handleOutsideClick)
    return () => {
      document.removeEventListener('click', handleOutsideClick)
    }
  })

  return (
    <footer className={styles.footer__wrapper}>
      <div className={styles.footer__navigation_wrapper}>
        <div
          ref={navigationLinkParentRef}
          className={cn(
            styles.footer__navigation_parent_box,
            { [styles.activeButton]: PUBLIC_ROUTES.linkToPdf === pathname || pathname.includes('/link/') },
            { [styles.common__disabled]: isSubmitting }
          )}
          role="button"
          tabIndex={0}
          onClick={handleLinkClick}
        >
          LINK to
        </div>
        <div
          ref={navigationHtmlParentRef}
          className={cn(
            styles.footer__navigation_parent_box,
            { [styles.activeButton]: PUBLIC_ROUTES.htmlToPdf === pathname || pathname.includes('/html/'), [styles.common__disabled]: true },
            { [styles.common__disabled]: isSubmitting }
          )}
          role="button"
          tabIndex={0}
          // onClick={handleHTMLClick}
        >
          HTML to
        </div>
        <div
          className={cn(styles.footer__navigation_parent_box, {
            [styles.common__disabled]: true
          })}
        >
          PDF to
        </div>
        <div
          ref={navigationLinkChildRef}
          className={cn(styles.footer__navigation_child_wrapper, {
            [styles.common__active]: state.isLinkConverterNavigation,
            [styles.common__hidden]: !state.isLinkConverterNavigation
          })}
        >
          {Object.keys(PUBLIC_ROUTES).map((key: string): JSX.Element | null =>
            key.startsWith('link') ? (
              <NavLink key={key} to={PUBLIC_ROUTES[key]}>
                <div
                  className={cn(styles.footer__navigation_parent_box, {
                    [styles.activeChildButton]: PUBLIC_ROUTES[key] === pathname,
                    [styles.footer__navigation_active_box]: PUBLIC_ROUTES[key] === pathname
                  })}
                  role="button"
                  tabIndex={0}
                  onClick={handleLinkClick}
                >
                  {key.split('To').pop().toUpperCase()}
                </div>
              </NavLink>
            ) : null
          )}
        </div>
        <div
          ref={navigationHtmlChildRef}
          className={cn(styles.footer__navigation_child_wrapper, {
            [styles.common__active]: state.isHTMLConverterNavigation,
            [styles.common__hidden]: !state.isHTMLConverterNavigation
          })}
        >
          {Object.keys(PUBLIC_ROUTES).map((key: string): JSX.Element | null =>
            key.startsWith('html') ? (
              <NavLink key={key} to={PUBLIC_ROUTES[key]}>
                <div
                  className={cn(styles.footer__navigation_parent_box, {
                    [styles.activeChildButton]: PUBLIC_ROUTES[key] === pathname,
                    [styles.footer__navigation_active_box]: PUBLIC_ROUTES[key] === pathname
                  })}
                  role="button"
                  tabIndex={0}
                  onClick={handleHTMLClick}
                >
                  {key.split('To').pop().toUpperCase()}
                </div>
              </NavLink>
            ) : null
          )}
        </div>
      </div>
      <Link className={styles.footer__made_by_block} to={EXTERNAL_LINKS.linkedIn}>
        made by Sergei Fediukov
      </Link>
    </footer>
  )
}
