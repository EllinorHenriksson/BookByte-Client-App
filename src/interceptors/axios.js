import axios from 'axios'

const axiosAuthService = axios.create({ baseURL: process.env.REACT_APP_URL_AUTH_SERVICE, withCredentials: true })
const axiosResourceService = axios.create({ baseURL: process.env.REACT_APP_URL_RESOURCE_SERVICE, withCredentials: true })
const axiosGoogleBooks = axios.create({ baseURL: process.env.REACT_APP_URL_GOOGLE_API })

let refresh = false

/**
 * Handles the response object.
 *
 * @param {object} res - The response object.
 * @returns {object} The response object.
 */
const handleResponse = (res) => {
  // Set jwt in default authorization header.
  const url = res.config.url
  if (url?.includes('login') || url?.includes('refresh')) {
    axiosAuthService.defaults.headers.common.authorization = `Bearer ${res.data.jwt}`
    axiosResourceService.defaults.headers.common.authorization = `Bearer ${res.data.jwt}`
  }
  return res
}

/**
 * Handles the error object.
 *
 * @param {object} err - The response object.
 * @returns {object} The response object.
 */
const handleError = async (err) => {
  // Sends a refresh request if jwt expires.
  if (err.response?.status === 401 && !refresh) {
    refresh = true

    const response = await axiosAuthService.get('refresh')

    // Next 3 lines are executed if the request was successfull.
    refresh = false
    err.config.headers.authorization = `Bearer ${response.data.jwt}`
    return axios(err.config)
  }

  refresh = false
  return Promise.reject(err)
}

axiosAuthService.interceptors.response.use(handleResponse, handleError)
axiosResourceService.interceptors.response.use(handleResponse, handleError)

export { axiosAuthService, axiosResourceService, axiosGoogleBooks }
