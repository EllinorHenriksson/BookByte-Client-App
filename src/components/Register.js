import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

/**
 * The Register component.
 *
 * @returns {object} The jsx html template.
 */
function Register () {
  const [username, setUsername] = useState('')
  const [givenName, setGivenName] = useState('')
  const [familyName, setFamilyName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const navigate = useNavigate()

  /**
   * Handles the click event.
   *
   */
  const handleClick = () => {
    setError(null)
  }

  /**
   * Handles the submit event.
   *
   * @param {Event} e - The event object.
   */
  const handleSubmit = (e) => {
    e.preventDefault()

    setIsLoading(true)
    setError(null)

    const data = { username, givenName, familyName, email, password }

    fetch(process.env.REACT_APP_URL_AUTH_SERVICE + '/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then(res => {
      setIsLoading(false)
      if (res.ok) {
        navigate('/login', { state: { success: 'Successfull registration' } })
      } else {
        if (res.status === 400) {
          setError('Registration failed: Data input not correctly formatted.')
        } else if (res.status === 404) {
          setError('Registration failed: Could not find the requested resource.')
        } else if (res.status === 409) {
          setError('Registration failed: Username and/or email address already registered.')
        } else {
          setError('Registration failed: Server error, please try again later.')
        }
      }
    }).catch(err => {
      console.log(err)
      setError('Registration failed: Network error, please try again later.')
      setIsLoading(false)
    })
  }

  return (
    <div className="register">
      {/* { error &&
        <div className='flash error'>
          <button type="button" onClick={ handleClick }></button>
          <div>{ error }</div>
        </div>
      } */}
      <div className='flash error'>
        <button type="button" onClick={ handleClick }></button>
        <div>Felmeddelande eeeeeeeeeeeeeeeeeeeee {error} </div>
      </div>
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
