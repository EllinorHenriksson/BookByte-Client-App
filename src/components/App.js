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
import { axiosAuthService, axiosResourceService } from '../interceptors/axios.js'

/**
 * The App component.
 *
 * @returns {object} A jsx html template.
 */
function App () {
  const [user, setUser] = useState(null)
  const [success, setSuccess] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    (async () => {
      try {
        const response = await axiosAuthService.get('refresh')
        axiosAuthService.defaults.headers.common.authorization = `Bearer ${response.data.jwt}`
        axiosResourceService.defaults.headers.common.authorization = `Bearer ${response.data.jwt}`
        setUser(response.data.user)
      } catch (error) {
        setUser(null)
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

  return (
    <Router>
      <div className="app">
        { !user && <NavbarAnonymous /> }
        { user && <NavbarAuthenticated user={ user } setUser={ setUser } setSuccess={ setSuccess } setError={ setError }/> }
        <div className="content">
          { success && <FlashSuccess success={ success } setSuccess={setSuccess}></FlashSuccess> }
          { error && <FlashError error={ error } setError={setError}></FlashError> }
          <Routes>
            { !user && <Route path="/" element={<HomeAnonymous setSuccess={ setSuccess } setError={ setError }/> }/>}
            { user && <Route path="/" element={<HomeAuthenticated setSuccess={ setSuccess } setError={ setError }/> }/>}
            { !user && <Route path="/login" element={ <Login setUser={ setUser } setSuccess={ setSuccess } setError={ setError } /> }/> }
            { !user && <Route path="/register" element={ <Register setSuccess={ setSuccess } setError={ setError }/> }/> }
            { user && <Route path="/swaps" element={ <Swaps setUser={ setUser } setSuccess={ setSuccess } setError={ setError }/> }/> }
            { user && <Route path="/wishlist" element={ <Wishlist setUser={ setUser } setSuccess={ setSuccess } setError={ setError } /> }/> }
            { user && <Route path="/bookshelf" element={ <Bookshelf setUser={ setUser } setSuccess={ setSuccess } setError={ setError } /> }/> }
            { user && <Route path="/profile" element={ <Profile user={ user } setUser={ setUser } setSuccess={ setSuccess } setError={ setError } /> }/> }
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
