import { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { UserContext } from '../../context/UserContext'

const AdminRoutes = () => {
  const { user, _ } = useContext(UserContext)
  let isAdmin = user.isAdmin
  return isAdmin ? <Outlet /> : <Navigate to="/" />
}

export default AdminRoutes
