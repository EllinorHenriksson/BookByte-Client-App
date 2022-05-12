import { useState } from 'react'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './Navbar.js'
import Home from './Home.js'
import Login from './Login.js'
import Register from './Register.js'
import Policy from './Policy.js'
import Cookies from './Cookies.js'
import NotFound from './NotFound.js'
import Footer from './Footer.js'
import Create from './Create.js'
import About from './About.js'

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
    <Router>
      <div className="app">
        <Navbar authenticated={ authenticated }/>
        <div className="content">
          <Routes>
            <Route path="/" element={<Home authenticated={ authenticated }/> } />
            <Route path="/about" element={<About /> } />
            { !authenticated && <Route path="/login" element={ <Login /> }/> }
            { !authenticated && <Route path="/register" element={ <Register /> }/> }
            { authenticated && <Route path="/create" element={ <Create /> }/> }
            <Route path="/policy" element={<Policy />} />
            <Route path="/cookies" element={<Cookies />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  )
}

export default App
