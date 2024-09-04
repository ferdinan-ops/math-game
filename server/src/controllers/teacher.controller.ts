import { type Request, type Response } from 'express'
import * as TeacherService from '../services/teacher.service'
import * as TeacherValidation from '../validations/teacher.validation'
import { logError, logWarn, logInfo } from '../utils/logger'

import { comparePassword, hashing } from '../middlewares/hashing'
import { accessTokenSign } from '../middlewares/jwt'

export const login = async (req: Request, res: Response) => {
  const { value, error } = TeacherValidation.validLogin(req.body as TeacherValidation.ITeacherLogin)
  if (error) {
    logError(req, error)
    return res.status(400).json({ error: error.details[0].message })
  }

  try {
    const user = await TeacherService.findTeacherByEmail(value.email)
    if (!user) {
      logWarn(req, 'Email or password is wrong')
      return res.status(400).json({ error: 'Email atau password Anda salah' })
    }

    const isValidPassword = comparePassword(value.password, user.password)
    if (!isValidPassword) {
      logWarn(req, 'Email or password is wrong')
      return res.status(400).json({ error: 'Email atau password Anda salah' })
    }

    const accessToken = accessTokenSign({ id: user.id, role: 'teacher' })
    const data = { role: 'teacher', access_token: accessToken }

    logInfo(req, 'User is successfully logged in')
    res.status(200).json({ message: 'Login berhasil', data })
  } catch (error) {
    res.status(500).json({ error })
  }
}

export const verifyEmail = async (req: Request, res: Response) => {
  if (!req.body?.token) {
    logError(req, 'Token is required')
    return res.status(400).json({ error: 'Token belum diisi' })
  }

  try {
    const checkToken = await TeacherService.findTeacherByToken(req.body.token as string)
    if (!checkToken) {
      logWarn(req, 'Token is not valid')
      return res.status(400).json({ error: 'Token sudah tidak berlaku' })
    }

    await TeacherService.verifyTeacherEmail(checkToken.id)
    logInfo(req, 'Email has been verified')
    res.status(200).json({ message: 'Email berhasil diverifikasi' })
  } catch (error) {
    res.status(500).json({ error })
  }
}

export const forgotPassword = async (req: Request, res: Response) => {
  const { email } = req.body
  if (!email) {
    logWarn(req, 'Email is not provided')
    return res.status(400).json({ error: 'Email harus diisi' })
  }

  try {
    const user = await TeacherService.findTeacherByEmail(email as string)
    if (!user) {
      logWarn(req, 'Email is not registered')
      return res.status(400).json({ error: 'Email tidak terdaftar' })
    }

    const token = TeacherService.generateToken()
    await TeacherService.updateTeacherToken(user.id, token)
    TeacherService.sendForgotPasswordEmail(email as string, token)

    logInfo(req, 'Email has been sent')
    res.status(200).json({ message: 'Email berhasil dikirim' })
  } catch (error) {
    res.status(500).json({ error })
  }
}

export const resetPassword = async (req: Request, res: Response) => {
  const { value, error } = TeacherValidation.validResetPassword(req.body as TeacherValidation.IResetPassword)
  if (error) {
    logError(req, error)
    return res.status(400).json({ error: error.details[0].message })
  }

  try {
    const user = await TeacherService.findTeacherByToken(value.token)
    if (!user) {
      logWarn(req, 'Token is not valid')
      return res.status(400).json({ error: 'Token sudah tidak berlaku' })
    }

    const hashedPassword = hashing(value.password)
    await TeacherService.updateTeacherPassword(user.id, hashedPassword)

    logInfo(req, 'Password has been reset')
    res.status(200).json({ message: 'Password berhasil direset' })
  } catch (error) {
    res.status(500).json({ error })
  }
}

export const changePassword = async (req: Request, res: Response) => {
  if (!req.body?.password) {
    logError(req, 'Password is required')
    return res.status(400).json({ error: 'Password baru belum diisi' })
  }

  const password = req.body.password as string
  const teacherId = req.userId as string

  try {
    const hashedPassword = hashing(password).toString()
    await TeacherService.updateTeacherPassword(teacherId, hashedPassword)

    logInfo(req, 'Changing user password')
    res.status(200).json({ message: 'Berhasil mengubah password user' })
  } catch (error) {
    res.status(500).json({ error })
  }
}

export const getMe = async (req: Request, res: Response) => {
  const teacherId = req.userId as string

  try {
    const teacher = await TeacherService.findTeacherById(teacherId)
    if (!teacher) {
      logError(req, 'Teacher not found')
      return res.status(404).json({ error: 'Data kamu tidak ditemukan' })
    }

    logInfo(req, 'Teacher data has been fetched')
    res.status(200).json({
      message: 'Data kamu berhasil kami dapatkan',
      data: teacher
    })
  } catch (error) {
    res.status(500).json({ error })
  }
}

export const updateMe = async (req: Request, res: Response) => {
  const { value, error } = TeacherValidation.validUpdateTeacher(req.body as TeacherValidation.ITeacherUpdate)
  if (error) {
    logError(req, error)
    return res.status(400).json({ error: error.details[0].message })
  }

  const teacherId = req.userId as string

  try {
    const teacher = await TeacherService.findTeacherById(teacherId)
    if (!teacher) {
      logWarn(req, 'Teacher not found')
      return res.status(404).json({ error: 'Data kamu tidak ditemukan' })
    }

    const isUsernameUsed = await TeacherService.findTeacherByUsername(value.username)

    if (isUsernameUsed?.username === value.username && isUsernameUsed.id !== teacherId) {
      logWarn(req, 'Username is already registered')
      return res.status(400).json({ error: 'Username ini sudah ada yang pakai' })
    }

    await TeacherService.updateTeacherProfile(teacher.id, value)
    logInfo(req, 'Teacher data has been updated')
    res.status(200).json({ message: 'Data kamu berhasil kami perbarui' })
  } catch (error) {
    res.status(500).json({ error })
  }
}

export const changeProfilePicture = async (req: Request, res: Response) => {
  if (!req.file) {
    logWarn(req, 'No file uploaded')
    return res.status(400).json({ error: 'Tidak ada file yang diupload' })
  }

  try {
    const data = await TeacherService.updatePhoto(req.userId as string, req.file.filename)

    logInfo(req, 'Changing user profile picture')
    res.status(200).json({ message: 'Berhasil mengubah foto profil user', data })
  } catch (error) {
    res.status(500).json({ error })
  }
}

export const changeEmail = async (req: Request, res: Response) => {
  if (!req.body?.email) {
    logWarn(req, 'Email is required')
    return res.status(400).json({ error: 'Email baru belum diisi' })
  }

  const email = req.body.email as string
  const teacherId = req.userId as string

  try {
    const user = await TeacherService.findTeacherByEmail(email)
    if (user) {
      logWarn(req, 'Email already exists')
      return res.status(400).json({ error: 'Email sudah dipakai' })
    }

    const token = TeacherService.generateToken()
    await TeacherService.updateTeacherEmail(teacherId, email, token)
    TeacherService.sendVerifyEmail(email, token)
    logInfo(req, 'Changing user email')
    res.status(200).json({ message: 'Berhasil mengubah email user' })
  } catch (error) {
    res.status(500).json({ error })
  }
}
