/**
 * The SwapperInfo component.
 *
 * @param {object} props - The props object
 * @returns {object} The jsx html template.
 */
export function SwapperInfo (props) {
  const { swapper, setSwapper } = props

  const style = { height: document.body.clientHeight.toString() + 'px' }

  /**
   * Handles click events on the close button.
   *
   * @param {Event} e - The event object.
   */
  const handleClickClose = (e) => {
    setSwapper(null)
  }

  return (
    <div className="swapper-info" style={ style }>
      <div>
        <img alt="Profile" src={ `https://www.gravatar.com/avatar/${swapper.email}?d=mp` }></img>
        <p><b>{ swapper.username }</b></p>
        <p>{ swapper.givenName } { swapper.familyName }</p>
        <p><a href={ `mailto: ${swapper.email}` }>Send email</a></p>
        <button onClick={ handleClickClose } />
      </div>
    </div>
  )
}
