import { Link } from 'react-router-dom'

/**
 * The NavbarAuthenticated component.
 *
 * @returns {object} The jsx html template.
 */
function NavbarAuthenticated () {
  return (
    <div className="navbar-authenticated">
      <h2>Navbar Authenticated</h2>
      <Link to="/">Home</Link>
    </div>
  )
}

export default NavbarAuthenticated
