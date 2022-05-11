import { useState } from 'react'
import AppAnonymous from './AppAnonymous.js'
import AppAuthenticated from './AppAuthenticated.js'

/**
 * The App component.
 *
 * @returns {object} A jsx html template.
 */
function App () {
  const [authenticated, setAuthenticated] = useState(false)

  fetch(process.env.REACT_APP_URL_AUTH_SERVICE + '/refresh')
    .then((res) => {
      if (res.ok) {
        // Lagra JWT och user info i local storage
        // Visa app för autentiserad användare
        setAuthenticated(true)
      }
    })
    .catch((error) => {
      // Ändra detta framöver till lämplig åtgärd
      console.log(error.message)
    })

  return (
    <div className="app">
      { !authenticated && <AppAnonymous /> }
      { authenticated && <AppAuthenticated /> }
    </div>
  )
}

export default App
