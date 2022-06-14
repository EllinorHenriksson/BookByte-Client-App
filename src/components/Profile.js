import { useRedirect } from '../hooks/useRedirect.js'
import { useState } from 'react'
import Update from './Update.js'
import { useGravatarUrl } from '../hooks/useGravatarUrl.js'
import { Delete } from './Delete.js'

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
        <div>
          <button onClick={ handleClickEdit }>Edit</button>
          <button className='delete-account' onClick={ handleClickWillDelete }>Delete account</button>
        </div>
      </div> }

      { isDeleting && <Delete setUser={ setUser } setIsDeleting={ setIsDeleting } setSuccess={ setSuccess } setError={ setError }></Delete> }
      { isEditing && <Update user={ user } setUser={ setUser } setIsEditing={ setIsEditing } setSuccess={ setSuccess } setError={ setError }></Update> }
    </div>
  )
}

export default Profile
