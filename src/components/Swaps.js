import { useEffect, useState } from 'react'
import { useRedirect } from '../hooks/useRedirect.js'
import { useNavigate } from 'react-router-dom'
import { BookInfo } from './BookInfo.js'
import { SwapperInfo } from './SwapperInfo.js'
import { axiosAuthService, axiosResourceService } from '../interceptors/axios.js'
import md5 from 'md5'
import { InfoHeader } from './InfoHeader.js'

/**
 * The Swaps component.
 *
 * @param {object} props - The props object.
 * @returns {object} The jsx html template.
 */
function Swaps (props) {
  const { setUser, setSuccess, setError } = props
  useRedirect(setSuccess, setError)

  const navigate = useNavigate()

  const [isLoading, setIsLoading] = useState(false)
  const [swaps, setSwaps] = useState(null)

  useEffect(() => {
    (async () => {
      setIsLoading(true)
      setSwaps(null)

      try {
        const resSwaps = await axiosResourceService.get('matches')
        const swapsData = resSwaps.data
        const promises = swapsData.map(async swap => {
          const resUser = await axiosAuthService.get(swap.otherUser)
          swap.otherUser = resUser.data
          return swap
        })

        const swapsModified = await Promise.all(promises)

        setSwaps(swapsModified)
        setIsLoading(false)
      } catch (error) {
        setIsLoading(false)
        if (error.response?.status === 401) {
          setUser(null)
          setError('Authentication broke, please try to log in again.')
          navigate('/', { state: { error: true } })
        } else if (!error.response?.status) {
          setError('Could not fetch data: Network error, please try again later.')
        } else {
          setError('Could not fetch data, please try again later.')
        }
      }
    })()
  }, [setUser, setError, navigate])

  const [book, setBook] = useState(null)
  const [swapper, setSwapper] = useState(null)

  useEffect(() => {
    if (book) {
      setSwapper(null)
    }
  }, [book])

  useEffect(() => {
    if (swapper) {
      setBook(null)
    }
  }, [swapper])

  /**
   * Hanldes click events for books by showing info box.
   *
   * @param {Event} e - The event object.
   */
  const handleClickBook = (e) => {
    const i = parseInt(e.target.parentElement.parentElement.getAttribute('id'))
    let key
    if (e.target.classList.contains('to-get')) {
      key = 'toGet'
    } else if (e.target.classList.contains('to-give')) {
      key = 'toGive'
    }

    setBook(swaps[i][key])
  }

  /**
   * Handles click events for swapper by showing info box.
   *
   * @param {Event} e - The event object.
   */
  const handleClickSwapper = (e) => {
    const i = parseInt(e.target.parentElement.parentElement.parentElement.getAttribute('id'))
    setSwapper(swaps[i].otherUser)
  }

  const heading = 'Swaps'
  const text = 'This page shows a list of possible swaps to make with another user: what book to get, what book to give and what user to swap with. To suggest a swap, simply send the other user an email.'

  return (
    <div className="swaps">
      <InfoHeader heading={ heading } text={ text } />
      <div className="swaps-content">
        { book && <BookInfo book={ book } setBook={ setBook } /> }
        { swapper && <SwapperInfo swapper={ swapper } setSwapper={ setSwapper } /> }
        { isLoading && <p>Loading...</p> }
        { swaps?.length === 0 && <p>No swaps at the moment.</p> }
        { swaps?.length > 0 &&
          <div className='swap-list'>
            { swaps.map((swap, i) => (
              <div className="swap-item" key={ i } id={ i }>
                <div className="swap-book">
                  <div>
                    { swap.toGet.imageLinks?.smallThumbnail && <img src={swap.toGet.imageLinks?.smallThumbnail} alt="Book cover" /> }
                    { !swap.toGet.imageLinks?.smallThumbnail && <img src='images/book.png' alt="Book cover" /> }
                    <p>GET</p>
                  </div>
                  <h3>{ swap.toGet.title }</h3>
                  <h4>{ swap.toGet.subtitle }</h4>
                  { swap.toGet.authors && <p>Authors: { swap.toGet.authors?.join(', ') }</p> }
                  <button className="to-get img info" title="Info" onClick={ handleClickBook }></button>
                </div>
                <div className="swap-book">
                  <div>
                    { swap.toGive.imageLinks?.smallThumbnail && <img src={swap.toGive.imageLinks?.smallThumbnail} alt="Book cover" /> }
                    { !swap.toGive.imageLinks?.smallThumbnail && <img src='images/book.png' alt="Book cover" /> }
                    <p>GIVE</p>
                  </div>
                  <h3>{ swap.toGive.title }</h3>
                  <h4>{ swap.toGive.subtitle }</h4>
                  { swap.toGive.authors && <p>Authors: { swap.toGive.authors?.join(', ') }</p> }
                  <button className='to-give img info' title="Info" onClick={ handleClickBook }></button>
                </div>
                <div className="swapper">
                  <img alt="Profile" src={ `https://gravatar.com/avatar/${md5(swap.otherUser.email.trim().toLowerCase())}?s=50&d=mp` } />
                  <p>Swapper: <b>{ swap.otherUser.username }</b></p>
                  <div className='button-container'>
                    <button className='text' onClick={ handleClickSwapper }>Contact</button>
                  </div>
                </div>
              </div>
            )) }
          </div> }
      </div>
    </div>
  )
}

export default Swaps
