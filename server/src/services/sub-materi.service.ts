import db from '../utils/db'

export const fetchAllSubMateri = async (materiId: string) => {
  return db.subMateri.findMany({ where: { id_materi: materiId } })
}

export const changeSubMateriMode = async (subMateriId: string, mode: boolean) => {
  return db.subMateri.update({
    where: { id: subMateriId },
    data: { mode_ujian: mode }
  })
}
