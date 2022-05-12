import { Link } from 'react-router-dom'

/**
 * The Navbar component.
 *
 * @param {object} props -The property object.
 * @returns {object} The jsx html template.
 */
function Navbar (props) {
  return (
    <div className="navbar">
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
      { !props.authenticated && <Link to="/login">Login</Link> }
      { !props.authenticated && <Link to="/register">Register</Link> }
      <Link to="/policy">Data Privacy Policy</Link>
      <Link to="/cookies">Cookies</Link>
    </div>
  )
}

export default Navbar
