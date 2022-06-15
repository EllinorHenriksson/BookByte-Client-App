import { axiosAuthService } from '../interceptors/axios.js'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

/**
 * The CookieSettings component.
 *
 * @param {object} props - The props object.
 * @returns {object} The jsx html template.
 */
export function CookieSettings (props) {
  const { setCookies, setShowCookies, user, setUser, setSuccess, setError } = props

  const [isLoading, setIsLoading] = useState(false)

  const navigate = useNavigate()

  const top = Math.round(window.scrollY)
  const style = { margin: `calc(${top}px + 50vh) auto auto 50vw` }

  /**
   * Handles click events on the agree button.
   */
  const handleClickAgree = () => {
    setCookies(true)
    localStorage.setItem('bookbyte', JSON.stringify({ cookies: true }))
    setShowCookies(false)
  }

  /**
   * Handles click events on the disagree button.
   */
  const handleClickDisagree = async () => {
    if (user) {
      setIsLoading(true)
      try {
        await axiosAuthService.get('logout')
        setIsLoading(false)
        setUser(null)
        setCookies(false)
        localStorage.setItem('bookbyte', JSON.stringify({ cookies: false }))
        setSuccess('Logged out due to changed cookie settings.')
        navigate('/', { state: { success: true } })
      } catch (error) {
        setIsLoading(false)
        if (error.response?.status === 401) {
          setCookies(false)
          localStorage.setItem('bookbyte', JSON.stringify({ cookies: false }))
          setUser(null)
          setError('Logged out due to broken authentication.')
          navigate('/', { state: { error: true } })
        } else if (!error.response?.status) {
          setError('Log out failed: Network error, please try again later.')
        } else {
          setError('Log out failed, please try again later.')
        }
      }
    } else {
      setCookies(false)
      localStorage.setItem('bookbyte', JSON.stringify({ cookies: false }))
      navigate('/')
    }

    setShowCookies(false)
  }

  return (
    <div className="cookie-settings" style={ style }>
      <h3>Cookie Settings</h3>
      <p>The website uses cookies to keep users authenticated. By clicking "Agree" you agree to the use of cookies. You can always change the cookie settings by clicking on the cookie icon in the footer. </p>
      { !isLoading && <div className="button-container">
        <button className="text" onClick={ handleClickAgree }>Agree</button>
        <button className="text delete" onClick={ handleClickDisagree }>Disagree</button>
      </div> }
      { isLoading && <div className="button-container">
        <button className="text" disabled>Agree</button>
        <button className="text delete" disabled>Loading...</button>
      </div> }
    </div>
  )
}
