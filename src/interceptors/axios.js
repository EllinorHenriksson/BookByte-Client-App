import axios from 'axios'

let refresh = false

axios.interceptors.response.use(resp => {
  // Set/remove user info to/from local storage
  const url = resp.config.url
  if (url.includes('login') || url.includes('refresh')) {
    localStorage.setItem('bookbyte', JSON.stringify({ user: resp.data.user }))
  } else if (url.includes('logout')) {
    localStorage.removeItem('bookbyte')
  }
  return resp
}, async error => {
  // Sends a refresh request if jwt expires.
  if (error.response.status === 401 && !refresh) {
    refresh = true

    const response = await axios.get(`${process.env.REACT_APP_URL_AUTH_SERVICE}/refresh`, { withCredentials: true })

    if (response.status === 200) {
      axios.defaults.headers.common.authorization = `Bearer ${response.data.jwt}`
      return axios(error.config)
    } else {
      // Remove user info from local storage.
      localStorage.removeItem('bookbyte')
    }
  }

  refresh = false
  throw error
})
