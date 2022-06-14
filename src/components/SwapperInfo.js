import md5 from 'md5'

/**
 * The SwapperInfo component.
 *
 * @param {object} props - The props object
 * @returns {object} The jsx html template.
 */
export function SwapperInfo (props) {
  const { swapper, setSwapper } = props

  const style1 = { height: `${document.body.clientHeight.toString()}px` }
  const top = Math.round(window.scrollY)
  const style2 = { margin: `calc(${top}px + 50vh) auto auto auto` }
  /**
   * Handles click events on the close button.
   *
   * @param {Event} e - The event object.
   */
  const handleClickClose = (e) => {
    setSwapper(null)
  }

  return (
    <div className="swapper-info" style={ style1 }>
      <div style={ style2 }>
        <img alt="Profile" src={ `https://gravatar.com/avatar/${md5(swapper.email.trim().toLowerCase())}?s=100&d=mp` }></img>
        <p><b>{ swapper.username }</b></p>
        <p>{ swapper.givenName } { swapper.familyName }</p>
        <p><a href={ `mailto: ${swapper.email}` }>Send email</a></p>
        <button onClick={ handleClickClose } />
      </div>
    </div>
  )
}
