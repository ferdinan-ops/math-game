import db from '../utils/db'
import crypto from 'crypto'
import { deleteFile } from '../utils/fileSettings'
import sendMail from '../middlewares/mailer'
import ENV from '../utils/environment'
import { type ITeacherUpdate } from '../validations/teacher.validation'

export const findTeacherByEmail = async (email: string) => {
  return await db.guru.findUnique({ where: { email } })
}

export const findTeacherById = async (id: string) => {
  return await db.guru.findUnique({ where: { id } })
}

export const findTeacherByUsername = async (username: string) => {
  return await db.guru.findUnique({ where: { username } })
}

export const updateTeacherEmail = async (id: string, email: string, token: string) => {
  return await db.guru.update({ where: { id }, data: { email, token, is_email_verified: false } })
}

export const updateTeacherProfile = async (id: string, payload: ITeacherUpdate) => {
  return await db.guru.update({ where: { id }, data: payload })
}

export const updateTeacherPassword = async (id: string, password: string) => {
  return await db.guru.update({ where: { id }, data: { password } })
}

export const processPhoto = async (oldPhoto: string, filename: string) => {
  if (oldPhoto) await deleteFile(oldPhoto)
  return filename
}

export const updatePhoto = async (id: string, filename: string) => {
  const user = await db.guru.findUnique({ where: { id } })
  if (!user) throw new Error('User tidak ditemukan')

  const oldPhoto = user.photo
  const newPhoto = await processPhoto(oldPhoto, filename)

  return await db.guru.update({
    where: { id },
    data: { photo: newPhoto }
  })
}

export const sendVerifyEmail = (email: string, token: string) => {
  sendMail({
    from: ENV.emailUsername,
    to: email,
    subject: 'Verifikasi Email',
    html: `<p>Berikut ini token untuk verifikasi email anda:</p><h1>${token}</h1>`
  })
}

export const sendForgotPasswordEmail = (email: string, token: string) => {
  sendMail({
    from: ENV.emailUsername,
    to: email,
    subject: 'Reset Password',
    html: `<p>Berikut ini token untuk reset password anda:</p><h1>${token}</h1>`
  })
}

export const generateToken = () => {
  return crypto.randomBytes(3).toString('hex')
}

export const updateTeacherToken = async (id: string, token: string) => {
  return await db.guru.update({ where: { id }, data: { token } })
}

export const findTeacherByToken = async (token: string) => {
  return await db.guru.findUnique({ where: { token } })
}

export const verifyTeacherEmail = async (userId: string) => {
  return await db.guru.update({
    where: { id: userId },
    data: {
      is_email_verified: true
    }
  })
}
