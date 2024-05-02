import { Navigate, Outlet } from 'react-router-dom'

const AdminRoutes = () => {
  let isAdmin = false
  return isAdmin ? <Outlet /> : <Navigate to="/" />
}

export default AdminRoutes
