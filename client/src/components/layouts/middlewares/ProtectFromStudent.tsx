import { useToken, useUserInfo } from '@/store/client'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

export default function ProtectFromStudent() {
  const location = useLocation()
  const accessToken = useToken((state) => state.accessToken)
  const user = useUserInfo((state) => state.user)

  if ((user?.role === 'student' && !accessToken) || (!user && !accessToken)) {
    return <Navigate to="/login" replace state={{ from: location }} />
  }

  if (user?.role === 'student' && accessToken) {
    return <Navigate to="/" replace state={{ from: location }} />
  }

  return <Outlet />
}
