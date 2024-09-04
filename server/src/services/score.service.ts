import { type IScore } from '../types/score.type'
import db from '../utils/db'

export const fetchAllScore = async (subMateriId: string) => {
  return db.nilai.findMany({
    where: {
      id_sub_materi: subMateriId
    }
  })
}

export const fetchScoresByStudentId = async (userId: string) => {
  return db.nilai.findMany({
    where: {
      id_siswa: userId
    }
  })
}

export const addNewScore = async (data: IScore) => {
  return db.nilai.create({ data })
}

export const changeScore = async (scoreId: string, newScore: number) => {
  return db.nilai.update({
    where: {
      id: scoreId
    },
    data: {
      nilai: newScore
    }
  })
}
