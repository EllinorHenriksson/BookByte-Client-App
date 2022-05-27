import { useEffect, useState } from 'react'
import { useRedirect } from '../hooks/useRedirect.js'

/**
 * The Swaps component.
 *
 * @param {object} props - The props object.
 * @returns {object} The jsx html template.
 */
function Swaps (props) {
  const { setSuccess, setError } = props
  useRedirect(setSuccess, setError)

  const [isLoading, setIsLoading] = useState(true)
  const [swaps, setSwaps] = useState(null)

  useEffect(() => {
    setSwaps(null)
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
  }, [setError])

  return (
    <div className="swaps">
      <h2>Swaps</h2>
      { isLoading && <div>Loading...</div> }
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
