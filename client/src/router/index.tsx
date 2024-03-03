import { Suspense } from 'react'

import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom'

import { PageLayout } from 'src/components/layouts/PageLayout/PageLayout'
// import ErrorBoundary from 'src/errorBoundary'
import CommonHtmlPage from 'src/pages/commonHtmlPage'
import CommonLinkPage from 'src/pages/commonLinkPage'

interface IPublicRoute {
  path: string
  component: JSX.Element
}

const { linkRoutes } = Object.keys(PUBLIC_ROUTES).reduce(
  (acc: { linkRoutes: IPublicRoute[]; htmlRoutes: IPublicRoute[] }, key: string) => {
    if (key.startsWith('link')) acc.linkRoutes.push({ path: PUBLIC_ROUTES[key], component: <CommonLinkPage /> })
    if (key.startsWith('html')) acc.linkRoutes.push({ path: PUBLIC_ROUTES[key], component: <CommonHtmlPage /> })
    return acc
  },
  { linkRoutes: [], htmlRoutes: [] }
)

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<PageLayout />} path="/">
      {linkRoutes.map(({ path, component }) => (
        <Route key={path} element={<Suspense fallback={<></>}>{component}</Suspense>} path={path} />
      ))}
    </Route>
  )
)
