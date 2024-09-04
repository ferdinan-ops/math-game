import express from 'express'

import verifyJwt, { verifyStudent } from '../middlewares/jwt'
import * as StudentController from '../controllers/student.controller'

const studentRoute = express.Router()

studentRoute.post('/auth/login', StudentController.login)
studentRoute.post('/auth/register', StudentController.register)

studentRoute.put('/reset-password', verifyJwt, verifyStudent, StudentController.resetPassword)
studentRoute.get('/me', verifyJwt, verifyStudent, StudentController.getMe)
studentRoute.put('/me', verifyJwt, verifyStudent, StudentController.updateMe)

export default studentRoute
