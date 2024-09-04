import { type Request, type Response } from 'express'

import { type IStudent } from '../types/student.type'
import { logError, logInfo, logWarn } from '../utils/logger'

import * as StudentService from '../services/student.service'
import * as StudentValidation from '../validations/student.validation'

import { accessTokenSign } from '../middlewares/jwt'
import { comparePassword, hashing } from '../middlewares/hashing'

export const login = async (req: Request, res: Response) => {
  const { value, error } = StudentValidation.validLogin(req.body as Omit<IStudent, 'avatar'>)
  if (error) {
    logError(req, error)
    return res.status(400).json({ error: error.details[0].message })
  }

  try {
    const student = await StudentService.findStudentByUsername(value.username)
    if (!student) {
      logWarn(req, 'Email or password is wrong')
      return res.status(400).json({ error: 'Username atau kata sandi kamu ada yang salah' })
    }

    const isValidPassword = comparePassword(value.password, student.password)
    if (!isValidPassword) {
      logWarn(req, 'Username or password is wrong')
      return res.status(400).json({ error: 'Username atau kata sandi kamu ada yang salah' })
    }

    const accessToken = accessTokenSign({ id: student.id, role: 'student' })
    const data = { role: 'student', access_token: accessToken }

    logInfo(req, 'Student is successfully logged in')
    res.status(200).json({ message: 'Kamu berhasil login', data })
  } catch (error) {
    res.status(500).json({ error })
  }
}

export const register = async (req: Request, res: Response) => {
  const { value, error } = StudentValidation.validRegister(req.body as IStudent)
  if (error) {
    logError(req, error)
    return res.status(400).json({ error: error.details[0].message })
  }

  try {
    const isStudentExist = await StudentService.findStudentByUsername(value.username)
    if (isStudentExist) {
      logWarn(req, 'Username is already registered')
      return res.status(404).json({ error: 'Username kamu sudah ada  yang pakai' })
    }

    value.password = hashing(value.password).toString()
    await StudentService.addNewStudent(value)

    logInfo(req, 'Student account has been registered')
    res.status(200).json({ message: 'Akun kamu berhasil kami buat' })
  } catch (error) {
    res.status(500).json({ error })
  }
}

export const resetPassword = async (req: Request, res: Response) => {
  if (!req.body?.password) {
    logError(req, 'Password is required')
    return res.status(400).json({ error: 'Kata sandi baru kamu belum diisi' })
  }

  const password = req.body.password as string
  const studentId = req.userId as string

  try {
    const student = await StudentService.findStudentById(studentId)
    if (!student) {
      logWarn(req, 'Student not found')
      return res.status(404).json({ error: 'Data kamu tidak ditemukan' })
    }

    const hashedPassword = hashing(password)
    await StudentService.updateStudentPassword(student.id, hashedPassword)

    logInfo(req, 'Password has been reset')
    res.status(200).json({ message: 'Kata sandi berhasil direset' })
  } catch (error) {
    res.status(500).json({ error })
  }
}

export const getMe = async (req: Request, res: Response) => {
  const studentId = req.userId as string

  try {
    const student = await StudentService.findStudentById(studentId)
    if (!student) {
      logError(req, 'Student not found')
      return res.status(404).json({ error: 'Data kamu tidak ditemukan' })
    }

    logInfo(req, 'Student data has been fetched')
    res.status(200).json({ message: 'Data kamu berhasil kami dapatkan', data: student })
  } catch (error) {
    res.status(500).json({ error })
  }
}

export const updateMe = async (req: Request, res: Response) => {
  const { value, error } = StudentValidation.validUpdateStudent(req.body as Omit<IStudent, 'password'>)
  if (error) {
    logError(req, error)
    return res.status(400).json({ error: error.details[0].message })
  }

  const studentId = req.userId as string

  try {
    const student = await StudentService.findStudentById(studentId)
    if (!student) {
      logWarn(req, 'Student not found')
      return res.status(404).json({ error: 'Data kamu tidak ditemukan' })
    }

    if (student.username === value.username) {
      logWarn(req, 'Username is already registered')
      return res.status(400).json({ error: 'Username ini sudah ada yang pakai' })
    }

    const data = await StudentService.updateStudentProfile(student.id, value)

    logInfo(req, 'Student data has been updated')
    res.status(200).json({ message: 'Data kamu berhasil kami perbarui', data })
  } catch (error) {
    res.status(500).json({ error })
  }
}
