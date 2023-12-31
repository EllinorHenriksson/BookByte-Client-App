import { useRedirect } from '../hooks/useRedirect.js'

/**
 * The HomeAnonymous component.
 *
 * @param {object} props - The props object.
 * @returns {object} The jsx html template.
 */
function HomeAnonymous (props) {
  const { setSuccess, setError } = props

  useRedirect(setSuccess, setError)

  return (
    <div className="home-anonymous">
      <h1>Welcome to BookByte</h1>
      <img alt="Illustration of books" src="images/book-byte.png"></img>
      <p>Makes book swapping easy!</p>
    </div>
  )
}

export default HomeAnonymous
