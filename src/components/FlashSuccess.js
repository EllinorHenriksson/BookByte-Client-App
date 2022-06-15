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
        <div>{ success }</div>
        <button className="img" onClick={ handleClick }></button>
      </div>
    </div>
  )
}

export default FlashSuccess
