import React from 'react'

import { GoogleOAuthProvider } from '@react-oauth/google'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from 'react-query'
import { RouterProvider } from 'react-router-dom'

import { ConvertedDataProvider } from './context/convertedDataContext.ts/ConvertedDataProvider'
import { GoogleApiProvider } from './context/googleApiContext/GoogleApiProvider'
import { SubmittingDisableProvider } from './context/submittingDisable/SubmittingDisableProvider'
import { ThemeProvider } from './context/theme/ThemeProvider'
import { router } from './router'

import 'src/styles/index.scss'

const root = document.getElementById('root')

if (!root) {
  throw new Error('root not found')
}

const container = createRoot(root)
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      retry: false,
      staleTime: 5 * 60 * 1000
    }
  }
})

const App: React.FC = () => {
  return (
    <React.StrictMode>
      <GoogleOAuthProvider clientId="707501433017-avq11frboko6npfrp4d07rd67nibk2bh.apps.googleusercontent.com">
        <QueryClientProvider client={queryClient}>
          <ConvertedDataProvider>
            <GoogleApiProvider>
              <SubmittingDisableProvider>
                <ThemeProvider>
                  <RouterProvider router={router} />
                </ThemeProvider>
              </SubmittingDisableProvider>
            </GoogleApiProvider>
          </ConvertedDataProvider>
        </QueryClientProvider>
      </GoogleOAuthProvider>
    </React.StrictMode>
  )
}

container.render(<App />)
