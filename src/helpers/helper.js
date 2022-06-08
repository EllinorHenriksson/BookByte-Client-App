/**
 * Modifies the book object from Google Books API to an object that can be sent to the application's resource API.
 *
 * @param {object} book - The book object formatted as is from Google Books API.
 * @returns {object} A new, modified book object.
 */
export function modifyBook (book) {
  const modifiedBook = {
    googleId: book.id,
    title: book.volumeInfo.title,
    subtitle: book.volumeInfo.subtitle,
    authors: book.volumeInfo.authors,
    publisher: book.volumeInfo.publisher,
    publishedDate: book.volumeInfo.publishedDate,
    description: book.volumeInfo.publishedDate,
    pageCount: book.volumeInfo.pageCount,
    categories: book.volumeInfo.categories,
    imageLinks: {
      smallThumbnail: book.volumeInfo.imageLinks?.smallThumbnail,
      thumbnail: book.volumeInfo.imageLinks?.thumbnail
    },
    language: book.volumeInfo.language
  }

  return modifiedBook
}
