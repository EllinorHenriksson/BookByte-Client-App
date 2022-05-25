import { useLocation, useNavigate, Link } from 'react-router-dom'
import { useState } from 'react'
import FlashError from './FlashError.js'
import FlashSuccess from './FlashSuccess.js'
import axios from 'axios'

/**
 * The Login component.
 *
 * @param {Function} setIsAuthenticated - The setter for the authenticated state.
 * @returns {object} The jsx html template.
 */
function Login ({ setIsAuthenticated }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [isLoading, setIsLoading] = useState(false)

  const location = useLocation()
  const [success, setSuccess] = useState(location.state?.success)
  const [error, setError] = useState(null)

  const navigate = useNavigate()

  /**
   * Handles the submit event.
   *
   * @param {Event} e - The event object.
   */
  const handleSubmit = async (e) => {
    e.preventDefault()

    setIsLoading(true)
    setSuccess(null)
    setError(null)

    try {
      const { data } = await axios.post(`${process.env.REACT_APP_URL_AUTH_SERVICE}/login`, { username, password }, { withCredentials: true })
      setIsLoading(false)
      axios.defaults.headers.common.authorization = `Bearer ${data.jwt}`
      setIsAuthenticated(true)
      navigate('/', { state: { success: 'Successfull authentication!' } })
    } catch (error) {
      setIsLoading(false)
      if (error.response) {
        if (error.response.status === 401) {
          setError('Authentication failed: Wrong username and/or password.')
        } else if (error.response.status === 500) {
          setError('Authentication failed: Server error, please try again later.')
        } else {
          setError('Registration failed, please try again later.')
          console.log(error.response)
        }
      } else {
        setError('Registration failed: Network error, please try again later.')
      }
    }
  }

  return (
    <div className='login auth'>
      { success && <FlashSuccess success={ success } setSuccess={setSuccess}></FlashSuccess> }
      { error && <FlashError error={ error } setError={setError}></FlashError> }
      <form
        onSubmit={ handleSubmit }>
        <label>Username:</label>
        <input
          type="text"
          required
          value={ username }
          onChange={ (e) => setUsername(e.target.value) }>
        </input>
        <label>Password:</label>
        <input
          type="password"
          required
          value={ password }
          onChange={ (e) => setPassword(e.target.value) }>
        </input>
        <label>
        <input
          type="checkbox"
          required>
        </input>I agree to the use of cookies</label>
        <Link to="./cookies">Cookies</Link>
        { !isLoading && <button type="submit">Login</button> }
        { isLoading && <button type="submit" disabled>Loading...</button> }
      </form>
    </div>
  )
}

export default Login
