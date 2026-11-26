import { Component } from 'react'
import { Alert } from '@mui/material'

// Error boundaries have to be class components: React has no hook for
// catching render errors. If anything rendered inside this component
// throws, the fallback below is shown in place of a blank page.
class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error, info) {
    console.error('Rendering error caught by ErrorBoundary:', error, info)
  }

  render() {
    if (this.state.hasError) {
      return (
        <Alert severity="error" style={{ marginTop: 10 }}>
          Something went wrong. Please try reloading the page.
        </Alert>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
