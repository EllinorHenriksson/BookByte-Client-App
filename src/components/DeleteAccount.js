import { useState } from 'react'
import { axiosAuthService, axiosResourceService } from '../interceptors/axios.js'
import { useNavigate } from 'react-router-dom'

/**
 * The Delete component.
 *
 * @param {object} props - The props object.
 * @returns {object} The jsx html template.
 */
export function DeleteAccount (props) {
  const { setUser, setIsDeleting, setSuccess, setError } = props
  const [isLoading, setIsLoading] = useState(false)

  const navigate = useNavigate()

  /**
   * Handles click events from delete button.
   */
  const handleClickDelete = async () => {
    setIsLoading(true)
    try {
      await axiosResourceService.delete()
      await axiosAuthService.delete('account')
      setIsLoading(false)
      setUser(null)
      setSuccess('Your account was successfully deleted.')
      navigate('/', { state: { success: true } })
    } catch (error) {
      setIsLoading(false)
      if (error.response?.status === 401) {
        setUser(null)
        setError('Deletion of account failed due to broken authentication.')
        navigate('/', { state: { error: true } })
      } else {
        setError('Deletion of account failed, please try again later.')
      }
    }
  }

  /**
   * Handles click events from delete button.
   */
  const handleClickCancel = () => {
    setIsDeleting(false)
  }

  return (
    <div className="delete-account">
        <p>Are you sure you want to delete your account? All stored data will be lost.</p>
        { !isLoading && <div className='button-container'>
          <button className="text delete" onClick={ handleClickDelete }>Delete</button>
          <button className='text' onClick={ handleClickCancel }>Cancel</button>
        </div> }
        { isLoading && <div className='button-container'>
          <button className='text delete' disabled>Loading...</button>
          <button className='text' disabled>Cancel</button>
        </div> }
      </div>
  )
}
