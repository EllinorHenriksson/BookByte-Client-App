/**
 * The FlashSuccess component.
 *
 * @param {object} root0 - The props object.
 * @param {string} root0.success - The success state.
 * @param {Function} root0.setSuccess - The setter for message.
 * @returns {object} The jsx html template.
 */
function FlashSuccess ({ success, setSuccess }) {
  /**
   * Handles click events.
   *
   */
  const handleClick = () => {
    setSuccess(null)
  }

  return (
    <div className="flash-success">
      <div className="flash success">
          <button type="button" onClick={ handleClick }></button>
          <div>{ success }</div>
        </div>
    </div>
  )
}

export default FlashSuccess
