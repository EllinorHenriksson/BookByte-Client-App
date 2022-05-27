import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * The useRedirect hook.
 *
 * @param {Function} setSuccess - The setter for the success state.
 * @param {Function} setError - The setter for the error state.
 */
export function useRedirect (setSuccess, setError) {
  const location = useLocation()

  useEffect(() => {
    if (!location.state?.redirect) {
      setSuccess(null)
      setError(null)
    }
  }, [location, setSuccess, setError])
}
