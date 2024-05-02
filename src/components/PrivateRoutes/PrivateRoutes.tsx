import { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { UserContext } from '../../context/UserContext'

const PrivateRoutes = () => {
  const { user, _ } = useContext(UserContext)
  let isAuthed = user ? true : false
  return isAuthed ? <Outlet /> : <Navigate to="/" />
}

export default PrivateRoutes
