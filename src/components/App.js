import { useEffect, useState } from 'react'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import NavbarAuthenticated from './NavbarAuthenticated.js'
import NavbarAnonymous from './NavbarAnonymous.js'
import Login from './Login.js'
import Register from './Register.js'
import Policy from './PrivacyPolicy.js'
import Cookies from './Cookies.js'
import NotFound from './NotFound.js'
import Footer from './Footer.js'
import HomeAnonymous from './HomeAnonymous.js'
import HomeAuthenticated from './HomeAuthenticated.js'
import Wishlist from './Wishlist.js'
import Bookshelf from './Bookshelf.js'
import Swaps from './Swaps.js'
import Profile from './Profile.js'
import axios from 'axios'

/**
 * The App component.
 *
 * @returns {object} A jsx html template.
 */
function App () {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    (async () => {
      try {
        console.log('refreshing in App')
        const response = await axios.get(process.env.REACT_APP_URL_AUTH_SERVICE + '/refresh', { withCredentials: true })
        axios.defaults.headers.common.authorization = `Bearer ${response.data.jwt}`
        setIsAuthenticated(true)
      } catch (error) {
        console.log(error)
        setIsAuthenticated(false)
      }
    })()
  }, [])

  return (
    <Router>
      <div className="app">
        { !isAuthenticated && <NavbarAnonymous /> }
        { isAuthenticated && <NavbarAuthenticated setIsAuthenticated={ setIsAuthenticated }/> }
        <div className="content">
          <Routes>
            { !isAuthenticated && <Route path="/" element={<HomeAnonymous /> }/>}
            { isAuthenticated && <Route path="/" element={<HomeAuthenticated /> }/>}
            { !isAuthenticated && <Route path="/login" element={ <Login setIsAuthenticated={ setIsAuthenticated } /> }/> }
            { !isAuthenticated && <Route path="/register" element={ <Register /> }/> }
            { isAuthenticated && <Route path="/swaps" element={ <Swaps /> }/> }
            { isAuthenticated && <Route path="/wishlist" element={ <Wishlist /> }/> }
            { isAuthenticated && <Route path="/bookshelf" element={ <Bookshelf /> }/> }
            { isAuthenticated && <Route path="/profile" element={ <Profile /> }/> }
            <Route path="/privacy-policy" element={<Policy />} />
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
