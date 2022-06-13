import { useRedirect } from '../hooks/useRedirect.js'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { axiosAuthService, axiosResourceService } from '../interceptors/axios.js'
import Update from './Update.js'

/**
 * The Profile component.
 *
 * @param {object} props - The props object.
 * @returns {object} The jsx html template.
 */
function Profile (props) {
  const { user, setUser, setSuccess, setError } = props
  useRedirect(setSuccess, setError)

  const [isEditing, setIsEditing] = useState(false)
  const [isLoadingDelete, setIsLoadingDelete] = useState(false)

  const navigate = useNavigate()

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
      setUser(null)
      setSuccess('Your account was successfully deleted.')
      navigate('/', { state: { success: true } })
    } catch (error) {
      setIsLoadingDelete(false)
      if (error.response?.status === 401) {
        setUser(null)
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
          <img alt="Profile" src="images/profile.png"></img>
          <p>{ user?.username }</p>
          <p>{ user?.givenName } { user?.familyName }</p>
          <p>{ user?.email }</p>
        </div>
        { !isLoadingDelete && <div>
          <button onClick={ handleClickEdit }>Edit</button>
          <button className='delete-account' onClick={ handleClickDelete }>Delete account</button>
        </div> }
        { isLoadingDelete && <div>
          <button disabled>Edit info</button>
          <button disabled>Loading...</button>
        </div> }
      </div> }

      { isEditing && <Update user={ user } setUser={ setUser } setIsEditing={ setIsEditing } setSuccess={ setSuccess } setError={ setError }></Update> }
    </div>
  )
}

export default Profile
