import { useRedirect } from '../hooks/useRedirect.js'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { axiosAuthService, axiosResourceService } from '../interceptors/axios.js'
import Update from './Update.js'

/**
 * The Profile component.
 *
 * @param {object} props - The props object.
 * @returns {object} The jsx html template.
 */
function Profile (props) {
  const { setIsAuthenticated, setSuccess, setError } = props
  useRedirect(setSuccess, setError)

  const [user, setUser] = useState(null)

  const [isEditing, setIsEditing] = useState(false)
  const [isLoadingDelete, setIsLoadingDelete] = useState(false)

  const navigate = useNavigate()

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem('bookbyte'))?.user)
  }, [])

  /**
   * Handles click events from edit button.
   */
  const handleClickEdit = async () => {
    setIsEditing(true)
  }

  /**
   * Handles click events from delete button.
   */
  const handleClickDelete = async () => {
    setIsLoadingDelete(true)
    try {
      await axiosResourceService.delete()
      await axiosAuthService.delete('account')
      setIsLoadingDelete(false)
      setIsAuthenticated(false)
      setSuccess('Your account was successfully deleted.')
      navigate('/', { state: { success: true } })
    } catch (error) {
      setIsLoadingDelete(false)
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

      { !isEditing && <div className='show-info'>
        <div className='user-info'>
          <p><b>{ user?.username }</b></p>
          <p>{ user?.givenName } { user?.familyName }</p>
          <p>{ user?.email }</p>
          <img alt="Profile" src="images/profile.png"></img>
        </div>
        <button onClick={ handleClickEdit }>Edit info</button>
        { !isLoadingDelete && <button onClick={ handleClickDelete }>Delete account</button> }
        { isLoadingDelete && <button disabled>Loading...</button> }
      </div> }

      { isEditing && <Update user={ user } setIsEditing={ setIsEditing }></Update> }
    </div>
  )
}

export default Profile
