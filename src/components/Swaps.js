import { useEffect, useState } from 'react'
import { useRedirect } from '../hooks/useRedirect.js'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

/**
 * The Swaps component.
 *
 * @param {object} props - The props object.
 * @returns {object} The jsx html template.
 */
function Swaps (props) {
  const { setIsAuthenticated, setSuccess, setError } = props
  useRedirect(setSuccess, setError)

  const navigate = useNavigate()

  const [isLoading, setIsLoading] = useState(false)
  const [swaps, setSwaps] = useState(null)

  useEffect(() => {
    (async () => {
      setIsLoading(true)

      try {
        const resSwaps = await axios.get(process.env.REACT_APP_URL_RESOURCE_SERVICE + '/matches')
        const swapsData = resSwaps.data
        const promises = swapsData.map(async swap => {
          const resUser = await axios.get(`${process.env.REACT_APP_URL_AUTH_SERVICE}/${swap.otherUser}`)
          swap.otherUser = resUser.data
          return swap
        })

        const swapsModified = await Promise.all(promises)

        setSwaps(swapsModified)
        console.log('Swaps: ', swapsModified)
        setIsLoading(false)
      } catch (error) {
        setIsLoading(false)
        if (error.response?.status === 401) {
          setIsAuthenticated(false)
          setError('Authentication broke, please try to log in again.')
          navigate('/', { state: { error: true } })
        } else {
          setError('Could not fetch the resource, please try again later.')
        }
      }
    })()
  }, [setIsAuthenticated, setError, navigate])

  return (
    <div className="swaps">
      { isLoading && <div>Loading...</div> }
      { swaps?.length === 0 && <p>No swaps at the moment</p> }
      { swaps?.length > 0 &&
        <div className='swap-list'>
          { swaps.map((swap, i) => (
            <div className="swap-item" key={ i }>
              <div className="swap-book">
                <div>
                  <img src={swap.toGet.imageLinks.smallThumbnail} alt="Book cover" />
                  <p>GET</p>
                </div>
                <h3>{ swap.toGet.title }</h3>
                { swap.toGet.subtitle && <h4>{ swap.toGet.subtitle }</h4> }
                <p>Authors: { swap.toGet.authors.join(', ') }</p>
                <button></button>
              </div>
              <div className="swap-book">
                <div>
                  <img src={swap.toGive.imageLinks.smallThumbnail} alt="Book cover" />
                  <p>GIVE</p>
                </div>
                <h3>{ swap.toGive.title }</h3>
                { swap.toGive.subtitle && <h4>{ swap.toGive.subtitle }</h4> }
                <p>Authors: { swap.toGive.authors.join(', ') }</p>
                <button></button>
              </div>
              <div className="swapper">
                <img alt="Profile" src="images/profile.png" />
                <p>Swapper: <b>{ swap.otherUser.username }</b></p>
                <button>Contact</button>
              </div>
            </div>
          )) }
        </div> }
    </div>
  )
}

export default Swaps
