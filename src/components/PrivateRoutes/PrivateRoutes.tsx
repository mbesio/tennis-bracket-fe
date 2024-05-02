import { Navigate, Outlet } from 'react-router-dom'

const PrivateRoutes = () => {
  let isAuthed = true
  return isAuthed ? <Outlet /> : <Navigate to="/" />
}

export default PrivateRoutes
