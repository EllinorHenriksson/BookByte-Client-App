import { BookInfo } from './BookInfo.js'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { axiosResourceService } from '../config/axios.js'

/**
 * The BookList component.
 *
 * @param {object} props - The props object.
 * @returns {object} The jsx html template.
 */
export function BookList (props) {
  const { books, setIsAuthenticated, setSuccess, setError, setUpdatedBook } = props
  const [book, setBook] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  /**
   * Handles click events by showing info box.
   *
   * @param {Event} e - The event object.
   */
  const handleClickInfo = (e) => {
    const i = parseInt(e.target.parentElement.parentElement.getAttribute('id'))
    setBook(books[i])
  }

  /**
   * Hanldes click events by deleting book resource.
   *
   * @param {Event} e - The event object.
   */
  const handleClickDelete = async (e) => {
    const i = parseInt(e.target.parentElement.parentElement.getAttribute('id'))
    const id = books[i].id

    try {
      setIsLoading(true)
      await axiosResourceService.delete(id)
      setIsLoading(false)
      setSuccess('Book was successfully deleted.')
      setUpdatedBook(id)
    } catch (error) {
      setIsLoading(false)
      if (error.response?.status === 401) {
        setIsAuthenticated(false)
        setError('Authentication broke, please try to log in again.')
        navigate('/', { state: { error: true } })
      } else {
        setError('Deletion of book failed, please try again later.')
      }
    }
  }

  return (
    <div className="book-list">
      { book && <BookInfo book={ book } setBook={ setBook }/> }
        { books.map((book, i) => (
          <div className="book-item" key={ i } id={ i }>
            <img alt="Book cover" src={ book.imageLinks.smallThumbnail }></img>
            <div>
              <h3>{ book.title }</h3>
              <h4>{ book.subtitle }</h4>
              <p>Authors: { book.authors.join(', ') }</p>
            </div>
            <div>
              <button className="info" onClick={ handleClickInfo }></button>
              { !isLoading && <button className="delete" onClick={ handleClickDelete }></button> }
              { isLoading && <button className="loading" disabled></button> }
            </div>
          </div>
        )) }
    </div>
  )
}
