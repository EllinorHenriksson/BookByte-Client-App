import { Link } from 'react-router-dom'

/**
 * The NavbarAnonymous component.
 *
 * @returns {object} The jsx html template.
 */
function NavbarAnonymous () {
  return (
    <div className="navbar-anonymous">
      <div>
        <Link to="/">Home</Link>
      </div>
      <div>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
      </div>
    </div>
  )
}

export default NavbarAnonymous
