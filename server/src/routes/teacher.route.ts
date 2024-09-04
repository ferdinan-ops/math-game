import express from 'express'

import verifyJwt, { verifyTeacher } from '../middlewares/jwt'
import * as TeacherController from '../controllers/teacher.controller'
import upload from '../middlewares/multer'

const teacherRoute = express.Router()

teacherRoute.post('/auth/login', TeacherController.login)
teacherRoute.put('/auth/reset-password', TeacherController.resetPassword)
teacherRoute.post('/auth/forgot-password', TeacherController.forgotPassword)
teacherRoute.post('/auth/verify-email', TeacherController.verifyEmail)

teacherRoute.get('/me', verifyJwt, verifyTeacher, TeacherController.getMe)
teacherRoute.put('/me', verifyJwt, verifyTeacher, TeacherController.updateMe)

teacherRoute.put('/change-password', verifyJwt, verifyTeacher, TeacherController.changePassword)
teacherRoute.put('/change-email', verifyJwt, verifyTeacher, TeacherController.changeEmail)

teacherRoute.put(
  '/change-photo',
  verifyJwt,
  verifyTeacher,
  upload.single('photo'),
  TeacherController.changeProfilePicture
)

export default teacherRoute
