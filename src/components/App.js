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
import FlashSuccess from './FlashSuccess.js'
import FlashError from './FlashError.js'
import { axiosAuthService, axiosResourceService } from '../config/axios.js'

/**
 * The App component.
 *
 * @returns {object} A jsx html template.
 */
function App () {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [success, setSuccess] = useState(null)
  const [error, setError] = useState(null)
  const [user, setUser] = useState(null)

  useEffect(() => {
    (async () => {
      try {
        const response = await axiosAuthService.get('refresh')
        axiosAuthService.defaults.headers.common.authorization = `Bearer ${response.data.jwt}`
        axiosResourceService.defaults.headers.common.authorization = `Bearer ${response.data.jwt}`
        setIsAuthenticated(true)
      } catch (error) {
        setIsAuthenticated(false)
      }
    })()
  }, [])

  useEffect(() => {
    if (success) {
      setError(null)
    }
  }, [success])

  useEffect(() => {
    if (error) {
      setSuccess(null)
    }
  }, [error])

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem('bookbyte'))?.user)
  }, [])

  return (
    <Router>
      <div className="app">
        { !isAuthenticated && <NavbarAnonymous /> }
        { isAuthenticated && <NavbarAuthenticated setIsAuthenticated={ setIsAuthenticated } setSuccess={ setSuccess } setError={ setError } user={ user }/> }
        <div className="content">
          { success && <FlashSuccess success={ success } setSuccess={setSuccess}></FlashSuccess> }
          { error && <FlashError error={ error } setError={setError}></FlashError> }
          <Routes>
            { !isAuthenticated && <Route path="/" element={<HomeAnonymous setSuccess={ setSuccess } setError={ setError }/> }/>}
            { isAuthenticated && <Route path="/" element={<HomeAuthenticated setIsAuthenticated={ setIsAuthenticated } setSuccess={ setSuccess } setError={ setError }/> }/>}
            { !isAuthenticated && <Route path="/login" element={ <Login setIsAuthenticated={ setIsAuthenticated } setSuccess={ setSuccess } setError={ setError } /> }/> }
            { !isAuthenticated && <Route path="/register" element={ <Register setSuccess={ setSuccess } setError={ setError }/> }/> }
            { isAuthenticated && <Route path="/swaps" element={ <Swaps setIsAuthenticated={ setIsAuthenticated } setSuccess={ setSuccess } setError={ setError }/> }/> }
            { isAuthenticated && <Route path="/wishlist" element={ <Wishlist setIsAuthenticated={ setIsAuthenticated } setSuccess={ setSuccess } setError={ setError } /> }/> }
            { isAuthenticated && <Route path="/bookshelf" element={ <Bookshelf setIsAuthenticated={ setIsAuthenticated } setSuccess={ setSuccess } setError={ setError } /> }/> }
            { isAuthenticated && <Route path="/profile" element={ <Profile setIsAuthenticated={ setIsAuthenticated } setSuccess={ setSuccess } setError={ setError } /> }/> }
            <Route path="/privacy-policy" element={<Policy setSuccess={ setSuccess } setError={ setError } />} />
            <Route path="/cookies" element={<Cookies setSuccess={ setSuccess } setError={ setError } />} />
            <Route path="*" element={<NotFound setSuccess={ setSuccess } setError={ setError } />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  )
}

export default App
