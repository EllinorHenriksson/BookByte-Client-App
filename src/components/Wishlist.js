import { useRedirect } from '../hooks/useRedirect.js'

/**
 * The Whishlist component.
 *
 * @param {object} props - The props object.
 * @returns {object} The jsx html template.
 */
function Wishlist (props) {
  const { setSuccess, setError } = props
  useRedirect(setSuccess, setError)

  return (
    <div className="wishlist">
      <h2>Wishlist</h2>
    </div>
  )
}

export default Wishlist
