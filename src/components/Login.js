import { useLocation, useNavigate, Link } from 'react-router-dom'
import { useState } from 'react'

/**
 * The Login component.
 *
 * @returns {object} The jsx html template.
 */
function Login () {
  const location = useLocation()
  const success = location.state?.success

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const navigate = useNavigate()

  /**
   * Handles the submit event.
   *
   * @param {Event} e - The event object.
   */
  const handleSubmit = (e) => {
    e.preventDefault()

    setIsLoading(true)
    setError(null)

    const data = { username, password }

    fetch(process.env.REACT_APP_URL_AUTH_SERVICE + '/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then(res => {
      setIsLoading(false)
      if (res.ok) {
        // Kom ihåg att spara undan JWT i local storage
        navigate('/home', { state: { success: 'Successfull authentication' } })
      } else {
        if (res.status === 401) {
          setError('Authentication failed: Wrong username and/or password.')
        } else if (res.status === 404) {
          setError('Authentication failed: Could not find the requested resource.')
        } else {
          setError('Authentication failed: Server error, please try again later.')
        }
      }
    }).catch(err => {
      console.log(err)
      setError('Authentication failed: Network error, please try again later.')
      setIsLoading(false)
    })
  }

  return (
    <div className='login'>
      { success && <div className='flash success'>{ success }</div> }
      { error && <div className='flash error'>{ error }</div> }
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
          minLength="10"
          value={ password }
          onChange={ (e) => setPassword(e.target.value) }>
        </input>
        <label>I agree to the use of cookies</label>
        <input
          type="checkbox"
          required>
        </input>
        <Link to="./cookies">Cookies</Link>
        { !isLoading && <button>Login</button> }
        { isLoading && <button disabled>Loading...</button> }
      </form>
    </div>
  )
}

export default Login
