/**
 * The SwapperInfo component.
 *
 * @param {object} props - The props object
 * @returns {object} The jsx html template.
 */
export function SwapperInfo (props) {
  const { swapper, setSwapper } = props

  /**
   * Handles click events on the close button.
   *
   * @param {Event} e - The event object.
   */
  const handleClickClose = (e) => {
    setSwapper(null)
  }

  return (
    <div className="swapper-info">
      <div>
          <p>{ swapper.username }</p>
          <button onClick={ handleClickClose } />
        </div>
    </div>
  )
}
