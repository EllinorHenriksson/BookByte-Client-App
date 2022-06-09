import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useRedirect } from '../hooks/useRedirect.js'
import { axiosAuthService } from '../interceptors/axios.js'

/**
 * The Register component.
 *
 * @param {object} props - The props object.
 * @returns {object} The jsx html template.
 */
function Register (props) {
  const { setSuccess, setError } = props
  useRedirect(setSuccess, setError)

  const [username, setUsername] = useState('')
  const [givenName, setGivenName] = useState('')
  const [familyName, setFamilyName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [isLoading, setIsLoading] = useState(false)

  const navigate = useNavigate()

  /**
   * Handles the submit event.
   *
   * @param {Event} e - The event object.
   */
  const handleSubmit = async (e) => {
    e.preventDefault()

    setIsLoading(true)
    setError(null)

    try {
      const data = { username, givenName, familyName, email, password }
      await axiosAuthService.post('register', data)
      setIsLoading(false)
      setSuccess('Successfull registration!')
      navigate('/login', { state: { success: true } })
    } catch (error) {
      setIsLoading(false)
      if (error.response) {
        if (error.response.status === 400) {
          setError('Registration failed: Data input not correctly formatted.')
        } else if (error.response.status === 409) {
          setError('Registration failed: Username and/or email address already registered.')
        } else if (error.response.status === 500) {
          setError('Registration failed: Server error, please try again later.')
        } else {
          setError('Registration failed, please try again later.')
        }
      } else {
        setError('Registration failed: Network error, please try again later.')
      }
    }
  }

  return (
    <div className="register auth">
      <form
        onSubmit={ handleSubmit }>
        <label>Username:</label>
        <input
          type="text"
          required
          pattern="[A-Za-z][A-Za-z0-9_-]{2,255}"
          title="Must be at least 3 characters long and may only contain a/A-z/Z, 0-9 and _."
          value={ username }
          onChange={ (e) => setUsername(e.target.value) }>
        </input>
        <label>Given name:</label>
        <input
          type="text"
          required
          value={ givenName }
          onChange={ (e) => setGivenName(e.target.value) }>
        </input>
        <label>Family name:</label>
        <input
          type="text"
          required
          value={ familyName }
          onChange={ (e) => setFamilyName(e.target.value)}>
        </input>
        <label>Email:</label>
        <input
          type="email"
          required
          pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
          title="example@example.com"
          value={ email }
          onChange={ (e) => setEmail(e.target.value) }>
        </input>
        <label>Password:</label>
        <input
          type="password"
          required
          minLength="10"
          maxLength="256"
          title="Must be at least 10 characters long."
          value={ password }
          onChange={ (e) => setPassword(e.target.value) }>
        </input>
        <Link to="./privacy-policy">Privacy Policy</Link>
        { !isLoading && <button type="submit">Register</button> }
        { isLoading && <button type="submit" disabled>Loading...</button> }
      </form>
    </div>
  )
}

export default Register
