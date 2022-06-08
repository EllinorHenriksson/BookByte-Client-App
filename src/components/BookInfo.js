/**
 * The BookInfo component.
 *
 * @param {object} props - The props object
 * @returns {object} The jsx html template.
 */
export function BookInfo (props) {
  const { book, setBook } = props

  const style = { height: document.body.clientHeight.toString() + 'px' }

  /**
   * Handles click events on the close button.
   *
   * @param {Event} e - The event object.
   */
  const handleClickClose = (e) => {
    setBook(null)
  }

  console.log(book)

  return (
    <div className="book-info" style={ style }>
      <div>
        { book.imageLinks?.smallThumbnail && <img alt="Book cover" src={book.imageLinks?.smallThumbnail} /> }
        { !book.imageLinks?.smallThumbnail && <img alt="Book cover" src='/images/book.png' /> }
        <h3>{ book.title }</h3>
        <h4>{ book.subtitle }</h4>
        { book.authors && <p>Authors: { book.authors?.join(', ') }</p> }
        { book.publisher && <p>Publisher: { book.publisher }</p> }
        { book.publishedDate && <p>Publish date: { book.publishedDate }</p> }
        { book.pageCount && <p>Pages: { book.pageCount }</p> }
        { book.language && <p>Language: { book.language }</p> }
        { book.description && <p>Description: { book.description }</p> }
        { book.categories && <p>Categories: { book.categories?.join(', ') }</p> }
        <button onClick={ handleClickClose } />
      </div>
    </div>
  )
}
