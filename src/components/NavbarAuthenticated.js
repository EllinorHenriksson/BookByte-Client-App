import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'

/**
 * The NavbarAuthenticated component.
 *
 * @param {Function} setIsAuthenticated - The setter for the isAuthenticated state.
 * @returns {object} The jsx html template.
 */
function NavbarAuthenticated ({ setIsAuthenticated }) {
  const navigate = useNavigate()

  /**
   * Handles the click event.
   *
   */
  const handleClick = async () => {
    await axios.get(`${process.env.REACT_APP_URL_AUTH_SERVICE}/logout`, { withCredentials: true })
    setIsAuthenticated(false)
    navigate('/', { state: { success: 'Successfull logout!' } })
  }

  return (
    <div className="navbar-authenticated">
      <Link to="/">Home</Link>
      <Link to="/swaps">Swaps</Link>
      <Link to="/wishlist">Wishlist</Link>
      <Link to="/bookshelf">Bookshelf</Link>
      <Link to="/profile">Profile</Link>
      <button onClick={ handleClick }>Logout</button>
    </div>
  )
}

export default NavbarAuthenticated
