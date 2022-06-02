/**
 * The BookList component.
 *
 * @param {object} props - The props object.
 * @returns {object} The jsx html template.
 */
export function BookList (props) {
  const { books } = props
  return (
    <div className="book-list">
      <p>BookList</p>
            { books.map((book, i) => (
              <div className="book-item" key={ i } id={ i }>
                <img alt="Book cover" src={ book.imageLinks.smallThumbnail }></img>
                <div>
                  <h3>{ book.title }</h3>
                  <h4>{ book.subtitle }</h4>
                  <p>Authors: { book.authors.join(', ') }</p>
                </div>
                <div>
                  <button className="info-button">Info</button>
                  <button className="delete-button">Delete</button>
                </div>
              </div>
            )) }
    </div>
  )
}
