import { Link } from 'react-router-dom'

/**
 * The Home component.
 *
 * @param {object} props - The property object.
 * @returns {object} The jsx html template.
 */
function Home (props) {
  if (!props.authenticated) {
    return (
      <div className="home">
        <h2>Welcome to BookByte</h2>
        <p>An application that makes book swapping easy!</p>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
      </div>
    )
  } else {
    return (
      <div className="home">
        <h2>Home authenticated</h2>
      </div>
    )
  }
}

export default Home
