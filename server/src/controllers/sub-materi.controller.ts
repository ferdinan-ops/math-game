import { type Request, type Response } from 'express'
import * as SubMateriService from '../services/sub-materi.service'
import { logInfo } from '../utils/logger'

export const getAllSubMateri = async (req: Request, res: Response) => {
  const { materiId } = req.params

  try {
    const data = await SubMateriService.fetchAllSubMateri(materiId)

    logInfo(req, 'Fetch all sub materi')
    res.status(200).json({ message: 'Fetch all sub materi', data })
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error })
  }
}

export const updateSubMateri = async (req: Request, res: Response) => {
  const { subMateriId } = req.params

  if (!req.body?.mode || typeof req.body.mode !== 'boolean') {
    return res.status(400).json({ message: 'Mode is required' })
  }

  try {
    const data = await SubMateriService.changeSubMateriMode(subMateriId, req.body.mode as boolean)

    logInfo(req, 'Update sub materi mode')
    res.status(200).json({ message: 'Update sub materi mode', data })
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error })
  }
}
