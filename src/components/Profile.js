import { useRedirect } from '../hooks/useRedirect.js'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { axiosAuthService, axiosResourceService } from '../config/axios.js'

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
  const [isLoading, setIsLoading] = useState(false)

  /**
   * Handles click events.
   */
  const handleClick = async () => {
    setIsLoading(true)
    try {
      await axiosResourceService.delete()
      await axiosAuthService.delete('account')
      setIsLoading(false)
      setIsAuthenticated(false)
      setSuccess('Your account was successfully deleted.')
      navigate('/', { state: { success: true } })
    } catch (error) {
      setIsLoading(false)
      if (error.response?.status === 401) {
        setIsAuthenticated(false)
        setError('Deletion of account failed due to broken authentication.')
        navigate('/', { state: { error: true } })
      } else {
        setError('Deletion of account failed, please try again later.')
      }
    }
  }

  return (
    <div className="profile">
      <h2>Profile</h2>
      { !isLoading && <button onClick={ handleClick }>Delete account</button> }
      { isLoading && <button disabled>Loading...</button> }
    </div>
  )
}

export default Profile
