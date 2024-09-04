import db from '../utils/db'
import { type IStudent } from '../types/student.type'

export const addNewStudent = async (payload: IStudent) => {
  return await db.siswa.create({ data: { ...payload, skor: 0 } })
}

export const findStudentByUsername = async (username: string) => {
  return await db.siswa.findUnique({ where: { username } })
}

export const findStudentById = async (id: string) => {
  const result = await db.siswa.findUnique({ where: { id } })

  if (result) {
    const { password, ...rest } = result
    return rest
  }

  return result
}

export const updateStudentScore = async (id: string, score: number) => {
  return await db.siswa.update({ where: { id }, data: { skor: score } })
}

export const updateStudentProfile = async (id: string, payload: Omit<IStudent, 'password'>) => {
  const result = await db.siswa.update({
    where: { id },
    data: { ...payload }
  })

  const { password, ...rest } = result
  return rest
}

export const updateStudentPassword = async (id: string, password: string) => {
  return await db.siswa.update({ where: { id }, data: { password } })
}
