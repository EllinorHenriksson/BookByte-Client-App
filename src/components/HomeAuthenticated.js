import { useEffect, useState } from 'react'
import axios from 'axios'
import { useRedirect } from '../hooks/useRedirect.js'

/**
 * The HomeAuthenticated component.
 *
 * @param {object} props - The props object.
 * @returns {object} The jsx html template.
 */
function HomeAuthenticated (props) {
  const { setIsAuthenticated, setSuccess, setError } = props
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState(null)

  useRedirect(setSuccess, setError)

  useEffect(() => {
    (async () => {
      setIsLoading(true)

      try {
        const response = await axios.get(process.env.REACT_APP_URL_AUTH_SERVICE + '/account')
        setIsLoading(false)
        setData(response.data)
      } catch (error) {
        setIsLoading(false)
        if (error.response?.status === 401) {
          setError('Authentication ended: Invalid refresh token, please try to log in again.')
          setIsAuthenticated(false)
        } else if (error.response?.status === 500 && error.response?.config.url.includes('refresh')) {
          setError('Authentication ended: Server error, please try to log in again later.')
          setIsAuthenticated(false)
        } else if (error.response?.status === 500 && error.response?.config.url.includes('account')) {
          setError('Could not fetch the resource: Server error, please try again later.')
        } else {
          setError('Could not fetch the resource, please try again later.')
        }
      }
    })()
  }, [setIsAuthenticated, setError])

  return (
    <div className="home-authenticated">
      <h2>Home authenticated</h2>
      { isLoading && <div>Loading...</div> }
      { data && <div>Welcome { data.username }</div> }
    </div>
  )
}

export default HomeAuthenticated
