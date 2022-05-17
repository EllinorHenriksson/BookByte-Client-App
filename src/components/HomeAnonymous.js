import { Link } from 'react-router-dom'

/**
 * The HomeAnonymous component.
 *
 * @returns {object} The jsx html template.
 */
function HomeAnonymous () {
  return (
    <div className="home-anonymous">
      <h1>Welcome to BookByte</h1>
      <img alt="Illustration of books" src="images/book-byte.png"></img>
      <p>Makes book swapping easy!</p>
      <div>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
      </div>
    </div>
  )
}

export default HomeAnonymous
