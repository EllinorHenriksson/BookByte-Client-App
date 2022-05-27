import { Link } from 'react-router-dom'
import { useRedirect } from '../hooks/useRedirect.js'

/**
 * The NotFound component.
 *
 * @param {object} props - The props object.
 * @returns {object} The jsx html template.
 */
function NotFound (props) {
  const { setSuccess, setError } = props
  useRedirect(setSuccess, setError)

  return (
    <div className="not-found">
      <h2>Sorry</h2>
      <p>The page you were trying to reach was not found.</p>
      <Link to="/">Go back to the home page...</Link>
    </div>
  )
}

export default NotFound
