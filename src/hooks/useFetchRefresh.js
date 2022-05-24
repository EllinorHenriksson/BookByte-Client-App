
import { useState, useEffect } from 'react'

/**
 * A custom hook for sending refresh requests.
 *
 * @returns {object} The states isAuthenticated, isLoading and error.
 */
const useFetchRefresh = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch(process.env.REACT_APP_URL_AUTH_SERVICE + '/refresh', { credentials: 'include' })
      .then(res => {
        setIsLoading(false)
        if (res.ok) {
          return res.json()
        } else if (res.status === 401) {
          setError('Failed to refresh access token: Refresh token invalid or not provided.')
        } else if (res.status === 404) {
          setError('Failed to refresh access token: Resource not found.')
        } else if (res.status === 500) {
          setError('Failed to refresh access token: Server error.')
        }
      })
      .then(data => {
        if (data) {
          localStorage.setItem('bookbyte', JSON.stringify(data))
          setIsAuthenticated(true)
        }
      })
      .catch((error) => {
        setIsLoading(false)
        setError('Failed to refresh access token: ' + error.message)
      })
  }, [])

  return { isAuthenticated, isLoading, error }
}

export default useFetchRefresh
