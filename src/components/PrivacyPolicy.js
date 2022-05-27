import { useRedirect } from '../hooks/useRedirect.js'

/**
 * The PrivacyPolicy component.
 *
 * @param {object} props - The props object.
 * @returns {object} The jsx html template.
 */
function PrivacyPolicy (props) {
  const { setSuccess, setError } = props
  useRedirect(setSuccess, setError)

  return (
    <div className="privacy-policy">
      <h2>Privacy Policy</h2>
    </div>
  )
}

export default PrivacyPolicy
