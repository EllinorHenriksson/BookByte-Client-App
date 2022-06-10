import { useState } from 'react'
import { axiosAuthService } from '../interceptors/axios'

/**
 * The Update component.
 *
 * @param {object} props - The props object.
 * @returns {object} The jsx html template.
 */
const Update = (props) => {
  const { user, setIsEditing } = props

  const [username, setUsername] = useState(user.username)
  const [givenName, setGivenName] = useState(user.givenName)
  const [familyName, setFamilyName] = useState(user.familyName)
  const [email, setEmail] = useState(user.email)
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')

  const [isLoading, setIsLoading] = useState(false)

  /**
   * Handles the submit event.
   *
   * @param {Event} event - The event object.
   */
  const handleSubmit = async (event) => {
    event.preventDefault()
    setIsLoading(true)

    const data = {
      username,
      givenName,
      familyName,
      email,
      oldPassword,
      newPassword
    }

    try {
      await axiosAuthService.patch('/account', data)
      localStorage.setItem('bookbyte', JSON.stringify({ username, givenName, familyName, email }))
    } catch (error) {
      // OBS! Hantera fel
    }
  }

  /**
   * Handles the reset event.
   *
   * @param {Event} event - The event object.
   */
  const handleClick = (event) => {
    event.preventDefault()
    setIsEditing(false)
  }

  return (
    <div className="update">
      <h2>Update</h2>
      <form
        onSubmit={ handleSubmit }>
          <fieldset>
            <legend>User info</legend>
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
          </fieldset>
          <fieldset>
            <legend>Password</legend>
            <label>Old password:</label>
            <input
              type="password"
              minLength="10"
              maxLength="256"
              title="Must be at least 10 characters long."
              value={ oldPassword }
              onChange={ (e) => setOldPassword(e.target.value) }>
            </input>
            <label>New password:</label>
            <input
              type="password"
              minLength="10"
              maxLength="256"
              title="Must be at least 10 characters long."
              value={ newPassword }
              onChange={ (e) => setNewPassword(e.target.value) }>
            </input>
          </fieldset>
        { !isLoading && <div>
          <button type="submit">Update</button>
          <button onClick={ handleClick }>Cancel</button>
        </div> }
        { isLoading && <div>
          <button type="submit" disabled>Loading...</button>
          <button disabled>Cancel</button>
        </div> }
      </form>
    </div>
  )
}

export default Update
