import { useEffect } from 'react'
import { useRedirect } from '../hooks/useRedirect.js'
import { useNavigate, useLocation } from 'react-router-dom'

/**
 * The HomeAuthenticated component.
 *
 * @param {object} props - The props object.
 */
function HomeAuthenticated (props) {
  const { setSuccess, setError } = props
  useRedirect(setSuccess, setError)

  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const state = {}
    if (location.state?.success) {
      state.success = true
    }

    if (location.state?.error) {
      state.error = true
    }
    navigate('/swaps', { state })
  }, [navigate, location.state?.success, location.state?.error])
}

export default HomeAuthenticated
