import React, { Component, ErrorInfo } from 'react'

interface Props {
  children: React.ReactNode
}

interface State {
  hasError: boolean
  // error: string
}

// class ErrorBoundary extends Component<Props, State> {
//   constructor(props: Props) {
//     super(props)
//     this.state = { hasError: false, error: '' }
//   }

//   componentDidCatch(error: Error, errorInfo: ErrorInfo) {
//     this.setState({ hasError: true, error: `Error: ${error.name}: ${error.message}. Error info: ${JSON.stringify(errorInfo, null, 2)}` })
//   }

//   render() {
//     const { children } = this.props
//     const { hasError, error } = this.state

//     if (hasError) {
//       return <h1>ololo{error}</h1>
//     }

//     return children
//   }
// }

// export default ErrorBoundary

// class ErrorBoundary extends Component<Props, State> {
//   constructor(props: Props) {
//     super(props)
//     this.state = { hasError: false, error: '' }
//   }

//   static getDerivedStateFromError(error: Error) {
//     // Update state so the next render will show the fallback UI.
//     return { hasError: true, error }
//   }

//   componentDidCatch(error: Error, errorInfo: ErrorInfo) {
//     // You can also log the error to an error reporting service
//     // logErrorToMyService(error, errorInfo);
//     console.log(error, errorInfo)
//   }

//   render() {
//     const { children } = this.props
//     const { hasError, error } = this.state
//     if (hasError) {
//       // You can render any custom fallback UI
//       return <h1>ololoSomething went wrong {error}</h1>
//     }

//     return <>{children}</>
//   }
// }
// export default ErrorBoundary

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      hasError: false
      // error: ''
      // info: { componentStack: '' }
    }
  }

  // state =;

  static getDerivedStateFromError = (error: Error) => {
    console.log('fsfsf', error)
    return { hasError: true }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.log('error', error)
    console.log('errorInfo', errorInfo)
    // this.state = { hasError: true }
  }
  render() {
    const { hasError } = this.state
    const { children } = this.props

    return hasError ? <>fgsgaga</> : children
  }
}

export default ErrorBoundary

// import React, { Component, ErrorInfo } from 'react';
