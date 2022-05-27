import { useRedirect } from '../hooks/useRedirect.js'

/**
 * The Profile component.
 *
 * @param {object} props - The props object.
 * @returns {object} The jsx html template.
 */
function Profile (props) {
  const { setSuccess, setError } = props
  useRedirect(setSuccess, setError)

  return (
    <div className="profile">
      <h2>Profile</h2>
    </div>
  )
}

export default Profile
