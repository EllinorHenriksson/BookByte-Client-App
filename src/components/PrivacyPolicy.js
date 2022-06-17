import { useRedirect } from '../hooks/useRedirect.js'

/**
 * The PrivacyPolicy component.
 *
 * @param {object} props - The props object.
 * @returns {object} The jsx html template.
 */
function PrivacyPolicy (props) {
  const { setSuccess, setError } = props
  useRedirect(setSuccess, setError)

  return (
    <div className="privacy-policy">
      <header>
        <h2>Privacy Policy</h2>
      </header>
      <main>
        <h3>Data use</h3>
        <p>Data about registered users and their books is stored in the website’s own databases and used to match books and present swap suggestions with contact details to the other user participating in the swap. Data is also needed to authenticate the user.</p>
        <h3>Delete data</h3>
        <p>Authenticated users can delete their account by opening the Profile page, clicking on the Delete button and confirming that they want to delete their account by clicking on a second Delete button. All personal data will then be deleted. </p>
        <a href="pdf/privacy-policy.pdf"><img alt='download' src="images/download.png" />Privacy Policy</a>
      </main>
    </div>
  )
}

export default PrivacyPolicy
