import * as TeacherValidation from '@/lib/validations/teacher.validation'
import { AuthResponseType } from '@/lib/types/response.type'
import { TeacherType } from '@/lib/types/teacher.type'
import api, { apiPublic } from './axiosInstance'

export const loginFn = async (payload: TeacherValidation.LoginType): Promise<AuthResponseType> => {
  const response = await apiPublic.post('/teacher/auth/login', payload)
  return response.data?.data
}

export const verifyEmailFn = async (token: string) => {
  return await apiPublic.post('/teacher/auth/verify-email', { token })
}

export const forgotPasswordFn = async (email: string) => {
  return await apiPublic.post('/teacher/auth/forgot-password', { email })
}

export const resetPasswordFn = async (payload: TeacherValidation.ResetPasswordType) => {
  const { confirmPassword, ...rest } = payload
  if (confirmPassword) {
    return await apiPublic.put('/teacher/auth/reset-password', rest)
  }
}

export const changePasswordFn = async (payload: TeacherValidation.ChangePasswordType) => {
  return await api.put('/teacher/change-password', payload)
}

export const updateEmailFn = async (email: string) => {
  return await api.put('/teacher/change-email', { email })
}

export const uploadProfilePicFn = async (data: TeacherValidation.ChangeProfilePicType): Promise<TeacherType> => {
  const formData = new FormData()
  if (Array.isArray(data.photo) && data.photo.length > 0) {
    formData.append('photo', data.photo[0])
  }

  const response = await api.put('/teacher/change-photo', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })

  return response.data?.data
}

export const getMeFn = async (): Promise<TeacherType> => {
  const response = await api.get('/teacher/me')
  return response.data?.data
}

export const updateMeFn = async (payload: TeacherValidation.UpdateTeacherType): Promise<TeacherType> => {
  const response = await api.put('/teacher/me', payload)
  return response.data?.data
}
