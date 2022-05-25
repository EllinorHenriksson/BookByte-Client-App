import axios from 'axios'

let refresh = false

axios.interceptors.response.use(resp => resp, async error => {
  if (error.response.status === 401 && !refresh) {
    refresh = true

    const response = await axios.get(`${process.env.REACT_APP_URL_AUTH_SERVICE}/refresh`, { withCredentials: true })

    if (response.status === 200) {
      axios.defaults.headers.common.authorization = `Bearer ${response.data.jwt}`
      return axios(error.config)
    }
  }

  refresh = false
  throw error
})
