import { NavLink } from 'react-router-dom'

/**
 * The NavbarAnonymous component.
 *
 * @returns {object} The jsx html template.
 */
function NavbarAnonymous () {
  return (
    <div className="navbar anonymous">
      <div>
        <NavLink to="/">BookByte</NavLink>
      </div>
      <div>
        <NavLink to="/login">Login</NavLink>
        <NavLink to="/register">Register</NavLink>
      </div>
    </div>
  )
}

export default NavbarAnonymous
