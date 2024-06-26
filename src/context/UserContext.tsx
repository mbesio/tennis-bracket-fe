import { createContext, useState } from 'react'

export const UserContext = createContext(null)

export default function UserContextProvider({ children }) {
  const [user, setUser] = useState({
    id: '',
    isAdmin: false,
    displayName: '',
    photo: '',
  })

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}
