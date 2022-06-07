import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { axiosAuthService } from '../config/axios.js'

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
      await axiosAuthService.get('logout')
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
    <div className="navbar authenticated">
      <div>
        <NavLink to="/" className={({ isActive }) => (isActive ? 'link-active' : 'link')}>BookByte</NavLink>
      </div>
      <div>
        <NavLink to="/swaps" className={({ isActive }) => (isActive ? 'link-active' : 'link')}>Swaps</NavLink>
        <NavLink to="/wishlist" className={({ isActive }) => (isActive ? 'link-active' : 'link')}>Wishlist</NavLink>
        <NavLink to="/bookshelf" className={({ isActive }) => (isActive ? 'link-active' : 'link')}>Bookshelf</NavLink>
      </div>
      <div>
        <NavLink to="/profile" className={({ isActive }) => (isActive ? 'link-active' : 'link')}><img alt="Profile" src="images/profile.png" /></NavLink>
        { !isLoading && <button onClick={ handleClick }>Logout</button> }
        { isLoading && <button disabled>Loading...</button> }
      </div>
    </div>
  )
}

export default NavbarAuthenticated
