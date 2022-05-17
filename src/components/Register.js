import { Link } from 'react-router-dom'

/**
 * The Register component.
 *
 * @returns {object} The jsx html template.
 */
function Register () {
  return (
    <div className="register">
      <form>
        <label for="username">Username:</label>
        <input
          type="text"
          required
          id="username">
        </input>
        <div class="info">Must be at least 3 characters long and may only contain a/A-z/Z, 0-9 and _.</div>
        <label for="given-name">Given name:</label>
        <input
          type="text"
          required
          id="given-name">
        </input>
        <label for="family-name">Family name:</label>
        <input
          type="text"
          id="family-name">
        </input>
        <label for="email">Email:</label>
        <input
          type="email"
          required
          id="email">
        </input>
        <label for="password">Password:</label>
        <input
          type="password"
          required
          id="password">
        </input>
        <div class="info">Must be at least 10 characters long.</div>
        <Link to="./privacy-policy">Privacy Policy</Link>
        <button>Register</button>
      </form>
    </div>
  )
}

export default Register
