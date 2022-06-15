import { Link } from 'react-router-dom'

/**
 * The Footer component.
 *
 * @param {object} props - The props object.
 * @returns {object} The jsx html template.
 */
function Footer (props) {
  const { setShowCookies } = props

  /**
   * Handles click events on the button.
   */
  const handleClick = () => {
    console.log('click')
    setShowCookies(true)
  }

  return (
    <div className="footer">
      <Link to="/privacy-policy">Privacy Policy</Link>
      <button onClick={ handleClick }>Cookie Settings</button>
    </div>
  )
}

export default Footer
