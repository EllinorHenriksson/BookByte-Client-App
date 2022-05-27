import { useRedirect } from '../hooks/useRedirect.js'

/**
 * The Bookshelf component.
 *
 * @param {object} props - The props object.
 * @returns {object} The jsx html template.
 */
function Bookshelf (props) {
  const { setSuccess, setError } = props
  useRedirect(setSuccess, setError)

  return (
    <div className="bookshelf">
      <h2>Bookshelf</h2>
    </div>
  )
}

export default Bookshelf
