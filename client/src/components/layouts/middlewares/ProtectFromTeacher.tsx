import { useToken, useUserInfo } from '@/store/client'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

export default function ProtectFromTeacher() {
  const location = useLocation()
  const accessToken = useToken((state) => state.accessToken)
  const user = useUserInfo((state) => state.user)

  console.log({ accessToken, user })

  if ((user?.role === 'teacher' && !accessToken) || (!user && !accessToken)) {
    return <Navigate to="/teacher/login" replace state={{ from: location }} />
  }

  if (user?.role === 'teacher' && accessToken) {
    return <Navigate to="/teacher/game" replace state={{ from: location }} />
  }

  return <Outlet />
}
