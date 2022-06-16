import { useState } from 'react'
/**
 * The InfoHeader component.
 *
 * @param {object} props - The props object.
 * @returns {object} The jsx html template.
 */
export function InfoHeader (props) {
  const { heading, text } = props
  const [showInfo, setShowInfo] = useState(false)

  /**
   * Handles click events on info button.
   */
  const handleClickInfo = () => {
    setShowInfo(true)
  }

  /**
   * Handles click events on close button.
   */
  const handleClickClose = () => {
    setShowInfo(false)
  }

  return (
    <div className="info-header">
      <h2>{ heading }</h2>
      { !showInfo && <button className='img info' title='Info' onClick={ handleClickInfo }></button> }
      { showInfo && <button className='img close' title='Close' onClick={ handleClickClose }></button> }
      { showInfo && <div>{ text }</div> }
    </div>
  )
}
