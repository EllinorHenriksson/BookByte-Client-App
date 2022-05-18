import { useLocation } from 'react-router-dom'
import { useState } from 'react'
import FlashSuccess from './FlashSuccess.js'

/**
 * The HomeAuthenticated component.
 *
 * @returns {object} The jsx html template.
 */
function HomeAuthenticated () {
  const location = useLocation()
  const [success, setSuccess] = useState(location.state?.success)

  return (
    <div className="home-authenticated">
      { success && <FlashSuccess success={ success } setSuccess={setSuccess}></FlashSuccess> }
      <h2>Home authenticated</h2>
    </div>
  )
}

export default HomeAuthenticated
