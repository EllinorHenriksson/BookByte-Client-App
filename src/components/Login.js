import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useRedirect } from '../hooks/useRedirect.js'
import { axiosAuthService, axiosResourceService } from '../interceptors/axios.js'

/**
 * The Login component.
 *
 * @param {object} props - The props object.
 * @returns {object} The jsx html template.
 */
function Login (props) {
  const { setUser, setSuccess, setError } = props
  useRedirect(setSuccess, setError)

  const [username, setUsername] = useState('')
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
    setSuccess(null)
    setError(null)

    try {
      const { data } = await axiosAuthService.post('login', { username, password })
      setIsLoading(false)
      axiosAuthService.defaults.headers.common.authorization = `Bearer ${data.jwt}`
      axiosResourceService.defaults.headers.common.authorization = `Bearer ${data.jwt}`
      setUser(data.user)
      setSuccess('Successfull authentication!')
      navigate('/', { state: { success: true } })
    } catch (error) {
      setIsLoading(false)
      if (error.response) {
        if (error.response.status === 401) {
          setError('Authentication failed: Wrong username and/or password.')
        } else if (error.response.status === 500) {
          setError('Authentication failed: Server error, please try again later.')
        } else {
          setError('Authentication failed, please try again later.')
        }
      } else {
        setError('Authentication failed: Network error, please try again later.')
      }
    }
  }

  return (
    <div className='login auth'>
      <header>
        <h2>Login</h2>
      </header>
      <main>
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
          <div className='button-container'>
            { !isLoading && <button className='text' type="submit">Login</button> }
            { isLoading && <button className='text' type="submit" disabled>Loading...</button> }
          </div>
        </form>
      </main>
    </div>
  )
}

export default Login
