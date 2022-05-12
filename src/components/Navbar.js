import { Link } from 'react-router-dom'

/**
 * The Navbar component.
 *
 * @returns {object} The jsx html template.
 */
function Navbar () {
  return (
    <div className="navbar">
      <h2>Navbar</h2>
      <Link to="/">Home</Link>
    </div>
  )
}

export default Navbar
