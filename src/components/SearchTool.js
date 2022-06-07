import { useEffect, useState } from 'react'
import { axiosGoogleBooks } from '../config/axios.js'
import { BookInfo } from './BookInfo.js'

/**
 * The SearchTool component.
 *
 * @returns {object} The jsx html template.
 */
export function SearchTool () {
  const [searchTerm, setSearchTerm] = useState('')
  const [books, setBooks] = useState(null)
  const [book, setBook] = useState(null)

  useEffect(() => {
    if (searchTerm) {
      (async () => {
        console.log('Search term: ', searchTerm)
        try {
          const { data } = await axiosGoogleBooks.get(`volumes?q=${searchTerm}&key=${process.env.REACT_APP_GOOGLE_API_KEY}`)
          setBooks(data.items)
        } catch (error) {
          console.log(error)
        }
      })()
    } else {
      setBooks('')
    }
  }, [searchTerm])

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
    console.log('click: ', e.target.parentElement)
    setBook(books[i])
  }

  return (
    <div className="search-tool">
      { book && <BookInfo book={ book.volumeInfo } setBook={ setBook }/> }
      <form onSubmit={ handleSubmit }>
        <label>Title:</label>
        <input
          type="search"
          required
          value={ searchTerm }
          onChange={ (e) => setSearchTerm(e.target.value) }>
        </input>
        <button>Search</button>
      </form>
      { books &&
      <div className='search-list'>
        { books.map((book, i) => (
          <div className='search-item' key={ i } id={ i }>
            <div>{ book.volumeInfo.title }</div>
            <button className="info" onClick={ handleClickInfo }>Info</button>
            <button>Add</button>
          </div>
        )) }
      </div>
      }
    </div>
  )
}
