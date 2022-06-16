import { useRedirect } from '../hooks/useRedirect.js'

/**
 * The About component.
 *
 * @param {object} props - The props object.
 * @returns {object} The jsx html template.
 */
export function About (props) {
  const { setSuccess, setError } = props
  useRedirect(setSuccess, setError)

  return (
    <div className="about">
      <header>
        <h2>About</h2>
      </header>
      <main>
        <h3>Purpose</h3>
        <p>BookByte lets you swap books with other users easily, by matching books that you own with books that you want to read. Suggestions of swaps are presented in a list, where each list item includes:</p>
        <ul>
          <li>a book that you want to read</li>
          <li>a book that you own</li>
          <li>a user to perform the swap with</li>
        </ul>
        <p>If you want to perform a swap you contact the other user by email and arrange it in a way that suits you both, perhaps by post or by hand if you’re in the same area.</p>
        <h3>Getting started</h3>
        <p>To take part of the service, you need to create an account. To create an account and log in, you need to agree to the use of cookies. If you want to change the cookie settings, click on the cookie symbol in the footer to open them.</p>
        <p>Once you have created an account and logged in, you can start adding books to your wishlist (i.e. books that you want to read) and to your bookshelf (i.e. books that you own and want to swap). When the system finds a match it presents a swap suggestion in the swap list.</p>
      </main>
    </div>
  )
}
