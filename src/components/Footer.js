import { Link } from 'react-router-dom'

/**
 * The Footer component.
 *
 * @returns {object} The jsx html template.
 */
function Footer () {
  return (
    <div className="footer">
      <Link to="/policy">Data Privacy Policy</Link>
      <Link to="/cookies">Cookies</Link>
    </div>
  )
}

export default Footer
