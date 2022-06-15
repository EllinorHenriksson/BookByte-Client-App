import { useEffect, useState } from 'react'
import { axiosAuthService } from '../interceptors/axios.js'
import { useNavigate } from 'react-router-dom'

/**
 * The Update component.
 *
 * @param {object} props - The props object.
 * @returns {object} The jsx html template.
 */
const EditProfile = (props) => {
  const { user, setUser, setIsEditing, setSuccess, setError } = props

  const [username, setUsername] = useState(user.username)
  const [givenName, setGivenName] = useState(user.givenName)
  const [familyName, setFamilyName] = useState(user.familyName)
  const [email, setEmail] = useState(user.email)
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')

  const [isLoading, setIsLoading] = useState(false)

  const navigate = useNavigate()

  useEffect(() => {
    setSuccess(null)
    setError(null)
  }, [setSuccess, setError])

  useEffect(() => {
    if (oldPassword || newPassword) {
      document.querySelectorAll('input[type="password"]').forEach(node => node.setAttribute('required', ''))
    } else {
      document.querySelectorAll('input[type="password"]').forEach(node => node.removeAttribute('required'))
    }
  }, [oldPassword, newPassword])

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
      setIsLoading(false)
      setSuccess('Profile was successfully updated!')
      setUser({ username, givenName, familyName, email })
      setIsEditing(false)
    } catch (error) {
      setIsLoading(false)

      if (error.response?.status === 400) {
        setError('Update failed: Data input not correctly formatted.')
      } else if (error.response?.status === 401) {
        if (error.config.url.includes('account')) {
          setError('Update failed: Wrong password.')
        } else {
          setUser(null)
          setError('Authentication broke, please try to log in again.')
          navigate('/', { state: { error: true } })
        }
      } else if (error.response?.status === 409) {
        setError('Update failed: Username and/or email address already registered.')
      } else if (error.response?.status === 500) {
        setError('Update failed: Server error, please try again later.')
      } else if (!error.response?.status) {
        setError('Update failed: Network error, please try again later.')
      } else {
        setError('Update failed, please try again later.')
      }
    }
  }

  /**
   * Handles the click event on the cancel button.
   *
   * @param {Event} event - The event object.
   */
  const handleClick = (event) => {
    event.preventDefault()
    setSuccess(null)
    setError(null)
    setIsEditing(false)
  }

  return (
    <div className="edit-profile">
      <form
        onSubmit={ handleSubmit }>
          <fieldset>
            <legend>User info</legend>
            <label>*Username:</label>
            <input
              type="text"
              required
              pattern="[A-Za-z][A-Za-z0-9_-]{2,255}"
              title="Must be at least 3 characters long and may only contain a/A-z/Z, 0-9 and _."
              value={ username }
              onChange={ (e) => setUsername(e.target.value) }>
            </input>
            <label>*Given name:</label>
            <input
              type="text"
              required
              value={ givenName }
              onChange={ (e) => setGivenName(e.target.value) }>
            </input>
            <label>*Family name:</label>
            <input
              type="text"
              required
              value={ familyName }
              onChange={ (e) => setFamilyName(e.target.value)}>
            </input>
            <label>*Email:</label>
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
        { !isLoading && <div className='button-container'>
          <button className='text' type="submit">Update</button>
          <button className='text' onClick={ handleClick }>Cancel</button>
        </div> }
        { isLoading && <div className='button-container'>
          <button className='text' type="submit" disabled>Loading...</button>
          <button className='text' disabled>Cancel</button>
        </div> }
      </form>
    </div>
  )
}

export default EditProfile
