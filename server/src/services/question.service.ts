import { type IQuestion } from '../types/question.type'
import db from '../utils/db'

export const findQuestionsByGameId = async (gameId: string, limit?: number) => {
  return await db.soal.findMany({
    where: { id_permainan: gameId },
    ...(limit && { take: limit })
  })
}

export const findQuestionById = async (id: string) => {
  return await db.soal.findUnique({ where: { id } })
}

export const addNewQuestion = async (payload: IQuestion) => {
  return await db.soal.create({ data: payload })
}

export const removeQuestionById = async (id: string) => {
  return await db.soal.delete({ where: { id } })
}

export const updateQuestionById = async (id: string, payload: Omit<IQuestion, 'id_permainan'>) => {
  return await db.soal.update({ where: { id }, data: payload })
}

export const addNewScore = async (score: number, studentId: string) => {
  return await db.siswa.update({ where: { id: studentId }, data: { skor: score } })
}
