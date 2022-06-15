/**
 * The CookieSettings component.
 *
 * @param {object} props - The props object.
 * @returns {object} The jsx html template.
 */
export function CookieSettings (props) {
  const { setCookies, setShowCookies } = props

  /**
   * Handles click events on the agree button.
   */
  const handleClickAgree = () => {
    setCookies(true)
    setShowCookies(false)
  }

  /**
   * Handles click events on the disagree button.
   */
  const handleClickDisagree = () => {
    setCookies(false)
    setShowCookies(false)
  }

  return (
    <div className="cookie-settings">
      <h3>Cookie Settings</h3>
      <p>The website uses cookies to keep users authenticated. By clicking "Agree" you agree to the use of cookies. You can always change the cookie settings by clicking on the cookie icon in the footer. </p>
      <div className="button-container">
        <button className="text" onClick={ handleClickAgree }>Agree</button>
        <button className="text delete" onClick={ handleClickDisagree }>Disagree</button>
      </div>
    </div>
  )
}
