import { Link } from 'react-router-dom'

/**
 * The NavbarAuthenticated component.
 *
 * @returns {object} The jsx html template.
 */
function NavbarAuthenticated () {
  return (
    <div className="navbar-authenticated">
      <Link to="/">Home</Link>
      <Link to="/swaps">Swaps</Link>
      <Link to="/wishlist">Wishlist</Link>
      <Link to="/bookshelf">Bookshelf</Link>
      <Link to="/profile">Profile</Link>
      <Link to="/logout">Logout</Link>
    </div>
  )
}

export default NavbarAuthenticated
