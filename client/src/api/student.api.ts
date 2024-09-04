import * as StudentValidation from '@/lib/validations/student.validation'
import { AuthResponseType } from '@/lib/types/response.type'
import { StudentType } from '@/lib/types/student.type'
import api, { apiPublic } from './axiosInstance'

export const loginFn = async (payload: StudentValidation.LoginType): Promise<AuthResponseType> => {
  const response = await apiPublic.post('/student/auth/login', payload)
  return response.data?.data
}

export const registerFn = async (payload: StudentValidation.RegisterType) => {
  console.log({ payload })
  return await apiPublic.post('/student/auth/register', payload)
}

export const resetPasswordFn = async (password: string) => {
  return await api.post('/student/reset-password', { password })
}

export const getMeFn = async (): Promise<StudentType> => {
  const response = await api.get('/student/me')
  return response.data?.data
}

export const updateMeFn = async (payload: StudentValidation.UpdateStudentType): Promise<StudentType> => {
  const response = await api.put('/student/me', payload)
  return response.data?.data
}
