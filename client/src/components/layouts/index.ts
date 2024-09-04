import ProtectedAuth from './middlewares/ProtectedAuth'
import ProtectedRoute from './middlewares/ProtectedRoute'
import ProtectFromStudent from './middlewares/ProtectFromStudent'
import ProtectFromTeacher from './middlewares/ProtectFromTeacher'

import AuthLayout from './AuthLayout'
import TeacherLayout from './TeacherLayout'
import StudentLayout from './StudentLayout'

export {
  ProtectedAuth,
  ProtectedRoute,
  AuthLayout,
  TeacherLayout,
  ProtectFromStudent,
  ProtectFromTeacher,
  StudentLayout
}
