import { Link } from 'react-router-dom'
import { useRedirect } from '../hooks/useRedirect.js'

/**
 * The HomeAnonymous component.
 *
 * @param {object} props - The props object.
 * @returns {object} The jsx html template.
 */
function HomeAnonymous (props) {
  const { setSuccess, setError, cookies } = props
  useRedirect(setSuccess, setError)

  return (
    <div className="home-anonymous">
      <h1>Welcome to BookByte</h1>
      <img alt="Illustration of books" src="images/book-byte.png"></img>
      <p>Makes book swapping easy!</p>
      <div className='button-container'>
        { !cookies && <Link to="/about" className='button'>About</Link>}
        { cookies && <Link to="/login" className='button'>Login</Link> }
        { cookies && <Link to="/register" className='button'>Register</Link> }
      </div>
    </div>
  )
}

export default HomeAnonymous
