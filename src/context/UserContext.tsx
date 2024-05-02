import { createContext, useState, useContext } from 'react'

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

function useThemeContext() {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error('context must be used within context provider')
  }
  return context
}
