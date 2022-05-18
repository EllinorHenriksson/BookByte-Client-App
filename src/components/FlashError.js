/**
 * The FlashError component.
 *
 * @param {object} root0 - The props object.
 * @param {string} root0.error - The message state.
 * @param {Function} root0.setError - The setter for message.
 * @returns {object} The jsx html template.
 */
function FlashError ({ error, setError }) {
  /**
   * Handles click events.
   *
   */
  const handleClick = () => {
    setError(null)
  }

  return (
    <div className="flash-error">
      <div className="flash error">
          <button type="button" onClick={ handleClick }></button>
          <div>{ error }</div>
        </div>
    </div>
  )
}

export default FlashError
