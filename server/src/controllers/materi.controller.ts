import { type Request, type Response } from 'express'
import * as MateriService from '../services/materi.service'
import { logError, logInfo } from '../utils/logger'

export const getAllMateri = async (req: Request, res: Response) => {
  try {
    const data = await MateriService.fetchAllMateri()

    logInfo(req, 'Fetch all materi')
    res.status(200).json({ message: 'Fetch all materi', data })
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error })
  }
}

export const getMateri = async (req: Request, res: Response) => {
  const { materiId } = req.params

  try {
    const data = await MateriService.fetchMateriById(materiId)
    if (!data) {
      res.status(404).json({ message: 'Materi not found' })
    }

    logInfo(req, 'Fetch materi by id')
    res.status(200).json({ message: 'Fetch materi by id', data })
  } catch (error) {
    logError(req, JSON.stringify(error))
    res.status(500).json({ message: 'Internal server error', error })
  }
}
