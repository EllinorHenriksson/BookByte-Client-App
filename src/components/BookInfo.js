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
        { !book.imageLinks?.smallThumbnail && <img alt="Book cover" src='/images/book-cover.png' /> }
        <h3>{ book.title }</h3>
        <h4>{ book.subtitle }</h4>
        <p>{ book.authors?.join(', ') }</p>
        <p>{ book.publisher }, { book.publishedDate }</p>
        <p>{ book.pageCount }pp., { book.language }</p>
        <p>Description: { book.description }</p>
        <p>{ book.categories?.join(', ') }</p>
        <button onClick={ handleClickClose } />
      </div>
    </div>
  )
}
