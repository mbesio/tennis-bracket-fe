import { useEffect, useState } from 'react'
import { SERVER_DOMAIN } from '../constants/constants'

function useAuth() {
  const [admin, setAdmin] = useState(false)

  useEffect(() => {
    const getme = async () => {
      const response = await fetch(`${SERVER_DOMAIN}/auth/admin`, {
        credentials: 'include',
      })
      const data = await response.json()
      setAdmin(data.data)
    }
    getme()
  }, [])

  return admin
}

export default useAuth
