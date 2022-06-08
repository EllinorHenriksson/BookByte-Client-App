import { axiosAuthService, axiosResourceService } from '../config/axios.js'
import axios from 'axios'

let refresh = false

/**
 * Handles the response object.
 *
 * @param {object} resp - The response object.
 * @returns {object} The response object.
 */
const handleResponse = (resp) => {
  // Set/remove user info to/from local storage
  const url = resp.config.url
  if (url?.includes('login') || url?.includes('refresh')) {
    localStorage.setItem('bookbyte', JSON.stringify({ user: resp.data.user }))
  } else if (url?.includes('logout')) {
    localStorage.removeItem('bookbyte')
  }
  return resp
}

/**
 * Handles the error object.
 *
 * @param {object} error - The response object.
 * @returns {object} The response object.
 */
const handleError = async (error) => {
  // Sends a refresh request if jwt expires.
  if (error.response?.status === 401 && !refresh) {
    refresh = true

    const response = await axiosAuthService.get('refresh')

    if (response.status === 200) {
      axiosAuthService.defaults.headers.common.authorization = `Bearer ${response.data.jwt}`
      axiosResourceService.defaults.headers.common.authorization = `Bearer ${response.data.jwt}`

      return axios(error.config)
    } else {
      // Remove user info from local storage.
      localStorage.removeItem('bookbyte')
    }
  }

  refresh = false
  throw error
}

axiosAuthService.interceptors.response.use(handleResponse, handleError)
axiosResourceService.interceptors.response.use(handleResponse, handleError)
