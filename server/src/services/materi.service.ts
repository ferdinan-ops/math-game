import db from '../utils/db'

export const fetchAllMateri = async () => {
  return db.materi.findMany()
}

export const fetchMateriById = async (id: string) => {
  return db.materi.findUnique({ where: { id } })
}
