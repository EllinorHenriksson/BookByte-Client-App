import { Link } from 'react-router-dom'

/**
 * The NavbarAnonymous component.
 *
 * @returns {object} The jsx html template.
 */
function NavbarAnonymous () {
  return (
    <div className="navbar-anonymous">
      <h2>Navbar Anonymous</h2>
      <Link to="/">Home</Link>
    </div>
  )
}

export default NavbarAnonymous
