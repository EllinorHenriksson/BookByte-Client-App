import axios from 'axios'

export const axiosAuthService = axios.create({ baseURL: process.env.REACT_APP_URL_AUTH_SERVICE, withCredentials: true })

export const axiosResourceService = axios.create({ baseURL: process.env.REACT_APP_URL_RESOURCE_SERVICE, withCredentials: true })

export const axiosGoogleBooks = axios.create({ baseURL: process.env.REACT_APP_URL_GOOGLE_API })
