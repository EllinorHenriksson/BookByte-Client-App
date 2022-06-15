import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import NavbarAuthenticated from './NavbarAuthenticated.js'
import NavbarAnonymous from './NavbarAnonymous.js'
import Login from './Login.js'
import Register from './Register.js'
import Policy from './PrivacyPolicy.js'
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
import { About } from './About.js'
import { CookieSettings } from './CookieSettings.js'

/**
 * The App component.
 *
 * @returns {object} A jsx html template.
 */
function App () {
  const [user, setUser] = useState(null)
  const [showCookies, setShowCookies] = useState(true)
  const [cookies, setCookies] = useState(false)
  const [success, setSuccess] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    (async () => {
      if (JSON.parse(localStorage.getItem('bookbyte'))?.cookies) {
        setCookies(true)
        setShowCookies(false)
        try {
          const response = await axiosAuthService.get('refresh')
          axiosAuthService.defaults.headers.common.authorization = `Bearer ${response.data.jwt}`
          axiosResourceService.defaults.headers.common.authorization = `Bearer ${response.data.jwt}`
          setUser(response.data.user)
        } catch (error) {
          setUser(null)
        }
      } else {
        setCookies(false)
        setShowCookies(true)
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
        { showCookies && <CookieSettings setCookies={ setCookies } setShowCookies={ setShowCookies } user={ user } setUser={ setUser } setSuccess={ setSuccess } setError={ setError }></CookieSettings> }

        { !user && <NavbarAnonymous cookies={ cookies } /> }
        { user && <NavbarAuthenticated user={ user } setUser={ setUser } setSuccess={ setSuccess } setError={ setError }/> }

        <div className="content">
          { success && <FlashSuccess success={ success } setSuccess={setSuccess}></FlashSuccess> }
          { error && <FlashError error={ error } setError={setError}></FlashError> }
          <Routes>
            { !user && <Route path="/" element={<HomeAnonymous setSuccess={ setSuccess } setError={ setError } /> }/>}
            { user && <Route path="/" element={<HomeAuthenticated setSuccess={ setSuccess } setError={ setError }/> }/>}
            { !user && <Route path="/about" element={ <About /> }/> }
            { (!user && cookies) && <Route path="/login" element={ <Login setUser={ setUser } setSuccess={ setSuccess } setError={ setError } /> }/> }
            { (!user && cookies) && <Route path="/register" element={ <Register setSuccess={ setSuccess } setError={ setError }/> }/> }
            { user && <Route path="/swaps" element={ <Swaps setUser={ setUser } setSuccess={ setSuccess } setError={ setError }/> }/> }
            { user && <Route path="/wishlist" element={ <Wishlist setUser={ setUser } setSuccess={ setSuccess } setError={ setError } /> }/> }
            { user && <Route path="/bookshelf" element={ <Bookshelf setUser={ setUser } setSuccess={ setSuccess } setError={ setError } /> }/> }
            { user && <Route path="/profile" element={ <Profile user={ user } setUser={ setUser } setSuccess={ setSuccess } setError={ setError } /> }/> }
            <Route path="/privacy-policy" element={<Policy setSuccess={ setSuccess } setError={ setError } />} />
            <Route path="*" element={<NotFound setSuccess={ setSuccess } setError={ setError } />} />
          </Routes>
        </div>
        <Footer setShowCookies={ setShowCookies } />
      </div>
    </Router>
  )
}

export default App
