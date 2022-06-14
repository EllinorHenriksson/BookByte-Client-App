import { useState, useEffect } from 'react'
import md5 from 'md5'

/**
 * Returns an url for the Gravatar API for a certain user.
 *
 * @param {object} user - The user state object.
 * @returns {string} - The url.
 */
export function useGravatarUrl (user) {
  const [url, setUrl] = useState()

  useEffect(() => {
    setUrl(`https://gravatar.com/avatar/${md5(user.email.trim().toLowerCase())}?s=100&d=mp`)
  }, [user])

  return url
}
