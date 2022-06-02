import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useRedirect } from '../hooks/useRedirect.js'
import { BookList } from './BookList.js'

/**
 * The Whishlist component.
 *
 * @param {object} props - The props object.
 * @returns {object} The jsx html template.
 */
function Wishlist (props) {
  const { setIsAuthenticated, setSuccess, setError } = props
  useRedirect(setSuccess, setError)

  const [books, setBooks] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const navigate = useNavigate()

  const [deletedBook, setDeletedBook] = useState(null)

  useEffect(() => {
    (async () => {
      setIsLoading(true)
      setBooks(null)
      try {
        const { data } = await axios.get(process.env.REACT_APP_URL_RESOURCE_SERVICE, { withCredentials: true })
        setIsLoading(false)
        setBooks(data.wanted)
      } catch (error) {
        setIsLoading(false)
        if (error.response?.status === 401) {
          setIsAuthenticated(false)
          setError('Authentication broke, please try to log in again.')
          navigate('/', { state: { error: true } })
        } else {
          setError('Could not fetch data, please try again later.')
        }
      }
    })()
  }, [setIsAuthenticated, setError, navigate, deletedBook])

  return (
    <div className="wishlist">
      <h2>Wishlist</h2>
      { books && <p>The wishlist is where you add books you want to read. Together with the books on your bookshelf, the system can match you against other users find possible swaps for you. </p> }
      <div className='wishlist-content'>
        { isLoading && <p>Loading...</p> }
        { books && <BookList books={ books } setIsAuthenticated={ setIsAuthenticated } setSuccess={ setSuccess } setError={ setError } setDeletedBook={ setDeletedBook }></BookList> }
      </div>
    </div>
  )
}

export default Wishlist
