import axios from 'axios'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

/**
 * The NavbarAuthenticated component.
 *
 * @param {object} props - The props object.
 * @returns {object} The jsx html template.
 */
function NavbarAuthenticated (props) {
  const { setIsAuthenticated, setSuccess, setError } = props
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)

  /**
   * Handles the click event.
   *
   */
  const handleClick = async () => {
    setIsLoading(true)
    try {
      await axios.get(`${process.env.REACT_APP_URL_AUTH_SERVICE}/logout`, { withCredentials: true })
      setIsLoading(false)
      setIsAuthenticated(false)
      setSuccess('Successfull logout!')
      navigate('/', { state: { success: true } })
    } catch (error) {
      setIsLoading(false)
      if (error.response?.status === 401) {
        setIsAuthenticated(false)
        setError('Logged out due to broken authentication.')
        navigate('/', { state: { error: true } })
      } else {
        setError('Log out failed, please try again later.')
      }
    }
  }

  return (
    <div className="navbar-authenticated">
      <Link to="/">Home</Link>
      <Link to="/swaps">Swaps</Link>
      <Link to="/wishlist">Wishlist</Link>
      <Link to="/bookshelf">Bookshelf</Link>
      <Link to="/profile">Profile</Link>
      { !isLoading && <button onClick={ handleClick }>Logout</button> }
      { isLoading && <button disabled>Loading...</button> }
    </div>
  )
}

export default NavbarAuthenticated
