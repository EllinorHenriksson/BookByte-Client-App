import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useRedirect } from '../hooks/useRedirect.js'
import { BookList } from './BookList.js'
import { SearchTool } from './SearchTool.js'
import { axiosResourceService } from '../interceptors/axios.js'
import { InfoHeader } from './InfoHeader.js'

/**
 * The Bookshelf component.
 *
 * @param {object} props - The props object.
 * @returns {object} The jsx html template.
 */
function Bookshelf (props) {
  const { setUser, setSuccess, setError } = props
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
        const { data } = await axiosResourceService.get('.')
        setIsLoading(false)
        setBooks(data.owned)
      } catch (error) {
        setIsLoading(false)
        if (error.response?.status === 401) {
          setUser(null)
          setError('Authentication broke, please try to log in again.')
          navigate('/', { state: { error: true } })
        } else if (!error.response?.status) {
          setError('Could not fetch data: Network error, please try again later.')
        } else {
          setError('Could not fetch data, please try again later.')
        }
      }
    })()
  }, [setUser, setError, navigate, update])

  const heading = 'Bookshelf'
  const text = 'The bookshelf is where you manage the books you own and want to swap. Together with the books in your wishlist, the system can match you against other users find possible swaps for you.'

  return (
    <div className="bookshelf">
      <InfoHeader heading={ heading } text={ text } />
      <SearchTool setUser={ setUser } setSuccess={ setSuccess } setError={ setError } setUpdate={ setUpdate } type="owned"></SearchTool>
      <div className='wishlist-content'>
        { isLoading && <p>Loading...</p> }
        { books?.length === 0 && <p>No books at the moment.</p> }
        { books?.length > 0 &&
        <BookList books={ books } setUser={ setUser } setSuccess={ setSuccess } setError={ setError } setUpdate={ setUpdate }></BookList> }
      </div>
    </div>
  )
}

export default Bookshelf
