import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useRedirect } from '../hooks/useRedirect.js'
import { BookList } from './BookList.js'
import { SearchTool } from './SearchTool.js'
import { axiosResourceService } from '../interceptors/axios.js'

/**
 * The Bookshelf component.
 *
 * @param {object} props - The props object.
 * @returns {object} The jsx html template.
 */
function Bookshelf (props) {
  const { setIsAuthenticated, setSuccess, setError } = props
  useRedirect(setSuccess, setError)

  const [books, setBooks] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const navigate = useNavigate()

  const [update, setUpdate] = useState(null)

  useEffect(() => {
    (async () => {
      setIsLoading(true)
      setBooks(null)
      try {
        const { data } = await axiosResourceService.get()
        setIsLoading(false)
        setBooks(data.owned)
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
  }, [setIsAuthenticated, setError, navigate, update])

  return (
    <div className="bookshelf">
      <h2>Bookshelf</h2>
      <p>The bookshelf is where you manage the books you own and want to swap. Together with the books in your wishlist, the system can match you against other users find possible swaps for you.</p>
      <SearchTool setIsAuthenticated={ setIsAuthenticated } setSuccess={ setSuccess } setError={ setError } setUpdate={ setUpdate } type="owned"></SearchTool>
      <div className='wishlist-content'>
        { isLoading && <p>Loading...</p> }
        { books?.length === 0 && <p>No books at the moment.</p> }
        { books?.length > 0 &&
        <BookList books={ books } setIsAuthenticated={ setIsAuthenticated } setSuccess={ setSuccess } setError={ setError } setUpdate={ setUpdate }></BookList> }
      </div>
    </div>
  )
}

export default Bookshelf
