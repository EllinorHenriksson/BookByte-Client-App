import { useRedirect } from '../hooks/useRedirect.js'

/**
 * The Cookies component.
 *
 * @param {object} props - The props object.
 * @returns {object} The jsx html template.
 */
function Cookies (props) {
  const { setSuccess, setError } = props
  useRedirect(setSuccess, setError)

  return (
    <div className="cookies">
      <h2>Cookies</h2>
    </div>
  )
}

export default Cookies
