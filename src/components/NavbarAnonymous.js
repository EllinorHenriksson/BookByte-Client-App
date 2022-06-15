import { NavLink } from 'react-router-dom'

/**
 * The NavbarAnonymous component.
 *
 * @param {object} props - The props object.
 * @returns {object} The jsx html template.
 */
function NavbarAnonymous (props) {
  const { cookies } = props
  return (
    <div className="navbar anonymous">
      <div>
        <NavLink to="/">BookByte</NavLink>
      </div>
      <div>
        <NavLink to="/about">About</NavLink>
        { cookies && <NavLink to="/login">Login</NavLink> }
        { cookies && <NavLink to="/register">Register</NavLink> }
      </div>
    </div>
  )
}

export default NavbarAnonymous
