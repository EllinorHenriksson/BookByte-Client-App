import { useEffect, useState } from 'react'
import { axiosGoogleBooks, axiosResourceService } from '../config/axios.js'
import { modifyBook } from '../helpers/helper.js'
import { BookInfo } from './BookInfo.js'
import { useNavigate } from 'react-router-dom'

/**
 * The SearchTool component.
 *
 * @param {object} props - The props object.
 * @returns {object} The jsx html template.
 */
export function SearchTool (props) {
  const { setIsAuthenticated, setSuccess, setError, setUpdatedBook } = props

  const [searchTerm, setSearchTerm] = useState('')
  const [books, setBooks] = useState(null)
  const [book, setBook] = useState(null)
  const [isLoadingSearch, setIsLoadingSearch] = useState(false)
  const [isLoadingAdd, setIsLoadingAdd] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    if (searchTerm) {
      (async () => {
        setIsLoadingSearch(true)
        setBooks(null)
        try {
          const { data } = await axiosGoogleBooks.get(`volumes?q=${searchTerm}&key=${process.env.REACT_APP_GOOGLE_API_KEY}`)
          setIsLoadingSearch(false)
          setBooks(data.items)
        } catch (error) {
          setIsLoadingSearch(false)
          setError('Could not perform search, please try again later. ')
        }
      })()
    } else {
      setBooks(null)
    }
  }, [searchTerm, setError])

  /**
   * Handles the click event.
   *
   * @param {Event} e - The event object.
   */
  const handleSubmit = (e) => {
    e.preventDefault()
  }

  /**
   * Handles click events by showing info box.
   *
   * @param {Event} e - The event object.
   */
  const handleClickInfo = (e) => {
    const i = parseInt(e.target.parentElement.getAttribute('id'))
    setBook(books[i].volumeInfo)
  }

  /**
   * Handles click events by adding book to wishlist.
   *
   * @param {Event} e - The event object.
   */
  const handleClickAdd = async (e) => {
    const i = parseInt(e.target.parentElement.getAttribute('id'))
    const data = {
      info: modifyBook(books[i]),
      type: 'wanted'
    }

    try {
      setIsLoadingAdd(true)
      const response = await axiosResourceService.post(data)
      setIsLoadingAdd(false)
      setSuccess('Book was succesfully added!')
      setUpdatedBook(response.data.id)
    } catch (error) {
      setIsLoadingAdd(false)
      if (error.response?.status === 401) {
        setIsAuthenticated(false)
        setError('Authentication broke, please try to log in again.')
        navigate('/', { state: { error: true } })
      } else {
        setError('Failed to add book, please try again later.')
      }
    }
  }

  return (
    <div className="search-tool">
      { book && <BookInfo book={ book } setBook={ setBook }/> }
      <form onSubmit={ handleSubmit }>
        <label>Title:</label>
        <input
          type="search"
          required
          value={ searchTerm }
          onChange={ (e) => setSearchTerm(e.target.value) }>
        </input>
        { !isLoadingSearch && <button>Search</button> }
        { isLoadingSearch && <button disabled>Loading...</button> }
      </form>
      { books &&
      <div className='search-list'>
        { books.map((book, i) => (
          <div className='search-item' key={ i } id={ i }>
            <div>{ book.volumeInfo.title }</div>
            <button className="info" onClick={ handleClickInfo }>Info</button>
            { !isLoadingAdd && <button className='add' onClick={ handleClickAdd }>Add</button> }
            { isLoadingAdd && <button disabled>Loading...</button> }
          </div>
        )) }
      </div>
      }
    </div>
  )
}
