import { useRedirect } from '../hooks/useRedirect.js'
import { useState } from 'react'
import EditProfile from './EditProfile.js'
import { useGravatarUrl } from '../hooks/useGravatarUrl.js'
import { DeleteAccount } from './DeleteAccount.js'

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
  const [isDeleting, setIsDeleting] = useState(false)

  const url = useGravatarUrl(user)

  /**
   * Handles click events from edit button.
   */
  const handleClickEdit = async () => {
    setIsEditing(true)
  }

  /**
   * Handles click events from delete button.
   */
  const handleClickWillDelete = () => {
    setIsDeleting(true)
  }

  return (
    <div className="profile">
      <h2>Profile</h2>

      { (!isEditing && !isDeleting) && <div className='show-info'>
        <div className='user-info'>
          <img alt="Profile" src={ url }></img>
          <p>{ user?.username }</p>
          <p>{ user?.givenName } { user?.familyName }</p>
          <p>{ user?.email }</p>
        </div>
        <div className='button-container'>
          <button className='text' onClick={ handleClickEdit }>Edit</button>
          <button className="text delete" onClick={ handleClickWillDelete }>Delete</button>
        </div>
      </div> }

      { isEditing && <EditProfile user={ user } setUser={ setUser } setIsEditing={ setIsEditing } setSuccess={ setSuccess } setError={ setError }></EditProfile> }
      { isDeleting && <DeleteAccount setUser={ setUser } setIsDeleting={ setIsDeleting } setSuccess={ setSuccess } setError={ setError }></DeleteAccount> }

    </div>
  )
}

export default Profile
