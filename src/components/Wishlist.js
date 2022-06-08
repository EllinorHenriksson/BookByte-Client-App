import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useRedirect } from '../hooks/useRedirect.js'
import { BookList } from './BookList.js'
import { SearchTool } from './SearchTool.js'
import { axiosResourceService } from '../config/axios.js'

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

  const [updatedBook, setUpdatedBook] = useState(null)

  useEffect(() => {
    (async () => {
      setIsLoading(true)
      setBooks(null)
      try {
        const { data } = await axiosResourceService.get()
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
  }, [setIsAuthenticated, setError, navigate, updatedBook])

  return (
    <div className="wishlist">
      <h2>Wishlist</h2>
      <p>The wishlist is where you manage the books you want to read. Together with the books on your bookshelf, the system can match you against other users find possible swaps for you.</p>
      <SearchTool setIsAuthenticated={ setIsAuthenticated } setSuccess={ setSuccess } setError={ setError } setUpdatedBook={ setUpdatedBook }></SearchTool>
      <div className='wishlist-content'>
        { isLoading && <p>Loading...</p> }
        { books?.length === 0 && <p>No books at the moment.</p> }
        { books?.length > 0 &&
          <BookList books={ books } setIsAuthenticated={ setIsAuthenticated } setSuccess={ setSuccess } setError={ setError } setUpdatedBook={ setUpdatedBook }></BookList> }
      </div>
    </div>
  )
}

export default Wishlist
