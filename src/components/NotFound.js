import { Link } from 'react-router-dom'

/**
 * The NotFound component.
 *
 * @returns {object} The jsx html template.
 */
function NotFound () {
  return (
    <div className="not-found">
      <h2>Sorry</h2>
      <p>The page you were trying to reach was not found.</p>
      <Link to="/">Go back to the home page...</Link>
    </div>
  )
}

export default NotFound
