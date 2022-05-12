import { Link } from 'react-router-dom'

/**
 * The HomeAnonymous component.
 *
 * @returns {object} The jsx html template.
 */
function HomeAnonymous () {
  return (
    <div className="home-anonymous">
      <h2>Welcome to BookByte</h2>
      <p>An application that makes book swapping easy!</p>
      <Link to="/login">Login</Link>
      <Link to="/register">Register</Link>
    </div>
  )
}

export default HomeAnonymous
