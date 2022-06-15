import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { axiosAuthService } from '../interceptors/axios.js'
import { useGravatarUrl } from '../hooks/useGravatarUrl.js'

/**
 * The NavbarAuthenticated component.
 *
 * @param {object} props - The props object.
 * @returns {object} The jsx html template.
 */
function NavbarAuthenticated (props) {
  const { user, setUser, setSuccess, setError } = props
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)

  const url = useGravatarUrl(user)

  /**
   * Handles the click event.
   *
   */
  const handleClick = async () => {
    setIsLoading(true)
    try {
      await axiosAuthService.get('logout')
      setIsLoading(false)
      setUser(null)
      setSuccess('Successfull logout!')
      navigate('/', { state: { success: true } })
    } catch (error) {
      setIsLoading(false)
      if (error.response?.status === 401) {
        setUser(null)
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
        <p>{ user.username }</p>
        <NavLink to="/profile" className={({ isActive }) => (isActive ? 'link-active' : 'link')} title="Profile"><img alt="Profile" src={ url } /></NavLink>
        { !isLoading && <button className='text' onClick={ handleClick }>Logout</button> }
        { isLoading && <button className='text' disabled>Loading...</button> }
      </div>
    </div>
  )
}

export default NavbarAuthenticated
