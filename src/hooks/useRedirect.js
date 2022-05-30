import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * Sets the success and error state to null if not indicated by location.state (makes it possible to keep flash messages throughout redirects).
 *
 * @param {Function} setSuccess - The setter for the success state.
 * @param {Function} setError - The setter for the error state.
 */
export function useRedirect (setSuccess, setError) {
  const location = useLocation()

  useEffect(() => {
    if (!location.state?.success) {
      setSuccess(null)
    }

    if (!location.state?.error) {
      setError(null)
    }
  }, [location, setSuccess, setError])
}
