import { useRedirect } from '../hooks/useRedirect.js'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

/**
 * The Profile component.
 *
 * @param {object} props - The props object.
 * @returns {object} The jsx html template.
 */
function Profile (props) {
  const { setIsAuthenticated, setSuccess, setError } = props
  useRedirect(setSuccess, setError)
  const navigate = useNavigate()

  /**
   * Handles click events.
   */
  const handleClick = async () => {
    try {
      await axios.delete(process.env.REACT_APP_URL_RESOURCE_SERVICE, { withCredentials: true })
      await axios.delete(`${process.env.REACT_APP_URL_AUTH_SERVICE}/account`, { withCredentials: true })
      setIsAuthenticated(false)
      setSuccess('Your account was successfully deleted.')
      navigate('/', { state: { redirect: true } })
    } catch (error) {
      console.log(error)
      if (error.response?.status === 401) {
        setIsAuthenticated(false)
        setError('Deletion of account failed due to broken authentication.')
        navigate('/', { state: { redirect: true } })
      } else {
        setError('Deletion of account failed, please try again later.')
      }
    }
  }

  return (
    <div className="profile">
      <h2>Profile</h2>
      <button onClick={ handleClick }>Delete account</button>
    </div>
  )
}

export default Profile
