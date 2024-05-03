import { useEffect, useState } from 'react'
import { SERVER_DOMAIN } from '../constants/constants'

function useAuth() {
  const [admin, setAdmin] = useState(false)

  useEffect(() => {
    const getme = async () => {
      try {
        const response = await fetch(`${SERVER_DOMAIN}/auth/admin`, {
          credentials: 'include',
        })
        if (!response.ok) {
          throw new Error('The response from the server was not ok')
        }
        const data = await response.json()
        setAdmin(data.data)
      } catch {
        console.error('There was a problem with the fetch operation')
      }
    }
    getme()
  }, [])

  return admin
}

export default useAuth
