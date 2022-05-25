import { useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import FlashSuccess from './FlashSuccess.js'
import axios from 'axios'

/**
 * The HomeAuthenticated component.
 *
 * @returns {object} The jsx html template.
 */
function HomeAuthenticated () {
  const location = useLocation()
  const [success, setSuccess] = useState(location.state?.success)
  const [username, setUsername] = useState('')

  useEffect(() => {
    (async () => {
      try {
        console.log('refreshing in Home')
        const { data } = await axios.get(process.env.REACT_APP_URL_AUTH_SERVICE + '/account')
        setUsername(data.username)
      } catch (error) {
        console.log(error)
      }
    })()
  }, [])

  return (
    <div className="home-authenticated">
      { success && <FlashSuccess success={ success } setSuccess={setSuccess}></FlashSuccess> }
      <h2>Home authenticated</h2>
      <div>Welcome { username }</div>
    </div>
  )
}

export default HomeAuthenticated
