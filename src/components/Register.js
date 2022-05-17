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

  const navigate = useNavigate()

  /**
   * Handles the submit event.
   *
   * @param {Event} e - The event object.
   */
  const handleSubmit = (e) => {
    e.preventDefault()

    setIsLoading(true)

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
        console.log('Successfull registration')
        navigate('/login')
      } else {
        // OBS! Ändra detta till riktig åtgärd
        console.log('Status code: ', res.status)
      }
    }).catch(error => {
      // OBS! Ändra detta till riktig åtgärd
      console.log(error.message)
      setIsLoading(false)
    })
  }

  return (
    <div className="register">
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
        { !isLoading && <button>Register</button> }
        { isLoading && <button disabled>Loading...</button> }
      </form>
    </div>
  )
}

export default Register
