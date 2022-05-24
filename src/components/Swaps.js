import { useEffect, useState } from 'react'
import useFetchRefresh from '../hooks/useFetchRefresh.js'

/**
 * The Swaps component.
 *
 * @returns {object} The jsx html template.
 */
function Swaps () {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [swaps, setSwaps] = useState(null)

  const { isAuthenticated } = useFetchRefresh()

  useEffect(() => {
    setSwaps(null)
    if (isAuthenticated) {
      fetch(
        process.env.REACT_APP_URL_RESOURCE_SERVICE + '/matches',
        {
          headers: {
            Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('bookbyte')).jwt
          },
          credentials: 'include'
        })
        .then(res => {
          if (res.ok) {
            return res.json()
          } else {
            throw new Error('Could not load the requested resource.')
          }
        })
        .then(data => {
          setSwaps(data)
          setIsLoading(false)
        })
        .catch((error) => {
          setIsLoading(false)
          setError(error.message)
        })
    } else {
      setError('Failed to refresh access token.')
      setIsLoading(false)
    }
  }, [isAuthenticated])

  return (
    <div className="swaps">
      <h2>Swaps</h2>
      { isLoading && <div>Loading...</div> }
      { error && <div>{ error }</div> }
      { swaps?.length
        ? (
            <ul>
              { swaps.map((swap, i) => <li key={ i }>{ swap.toGive.googleID }</li>) }
            </ul>
          )
        : (<p>No swaps at the moment</p>)
      }
      {/* {swaps.forEach(swap => <div>{ swap.toGet }</div>)} */}
    </div>
  )
}

export default Swaps
