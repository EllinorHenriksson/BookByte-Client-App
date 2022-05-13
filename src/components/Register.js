import { Link } from 'react-router-dom'

/**
 * The Register component.
 *
 * @returns {object} The jsx html template.
 */
function Register () {
  return (
    <div className="register">
      <h2>Register</h2>
      <form>
        <label>Username:
        <input
          type="text"
          required>
        </input></label>
        <label>Given name:
        <input
          type="text"
          required>
        </input></label>
        <label>Family name:
        <input
          type="text">
        </input></label>
        <label>Email:
        <input
          type="email"
          required>
        </input></label>
        <label>Password:
        <input
          type="password"
          required>
        </input></label>
        <Link to="./privacy-policy">Privacy Policy</Link>
        <button>Register</button>
      </form>
    </div>
  )
}

export default Register
