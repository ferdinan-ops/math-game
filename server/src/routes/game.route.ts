import express from 'express'
import db from '../utils/db'
import { logInfo, logWarn } from '../utils/logger'
import verifyJwt from '../middlewares/jwt'

const gameRoute = express.Router()

gameRoute.post('/', async (req, res) => {
  if (!req.body?.nama_permainan) {
    logWarn(req, 'Nama permainan tidak boleh kosong')
    return res.status(400).json({ message: 'Nama permainan tidak boleh kosong' })
  }

  try {
    const game = await db.permainan.create({ data: req.body })

    logInfo(req, 'Permainan berhasil dibuat')
    res.status(201).json({ message: 'Permainan berhasil dibuat', data: game })
  } catch (error) {
    res.status(500).json({ error })
  }
})

gameRoute.get('/', verifyJwt, async (req, res) => {
  try {
    const games = await db.permainan.findMany({ orderBy: { nama_permainan: 'desc' } })

    logInfo(req, 'Data permainan berhasil didapatkan')
    res.status(200).json({ data: games, message: 'Data permainan berhasil didapatkan' })
  } catch (error) {
    res.status(500).json({ error })
  }
})

gameRoute.get('/:id', verifyJwt, async (req, res) => {
  const gameId = req.params.id

  try {
    const game = await db.permainan.findUnique({ where: { id: gameId } })
    if (!game) {
      logWarn(req, 'Permainan tidak ditemukan')
      return res.status(404).json({ message: 'Permainan tidak ditemukan' })
    }

    logInfo(req, 'Data permainan berhasil didapatkan')
    res.status(200).json({ data: game, message: 'Data permainan berhasil didapatkan' })
  } catch (error) {
    res.status(500).json({ error })
  }
})

export default gameRoute
