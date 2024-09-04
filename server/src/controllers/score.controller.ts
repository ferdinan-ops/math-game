import { type Request, type Response } from 'express'
import * as ScoreService from '../services/score.service'
import { logError, logInfo, logWarn } from '../utils/logger'
import { validStoreScore } from '../validations/score.validation'
import { type IScore } from '../types/score.type'

export const getAllScore = async (req: Request, res: Response) => {
  const { subMateriId } = req.params

  try {
    const data = await ScoreService.fetchAllScore(subMateriId)

    logInfo(req, 'Fetch all score')
    res.status(200).json({ message: 'Success fetch all score', data })
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error })
  }
}

export const getMyScore = async (req: Request, res: Response) => {
  try {
    const data = await ScoreService.fetchScoresByStudentId(req.userId as string)

    logInfo(req, 'Fetch all score by student id')
    res.status(200).json({ message: 'Success fetch all score by student id', data })
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error })
  }
}

export const storeScore = async (req: Request, res: Response) => {
  const { value, error } = validStoreScore(req.body as IScore)
  if (error) {
    logError(req, error)
    return res.status(400).json({ error: error.details[0].message })
  }

  try {
    await ScoreService.addNewScore(value)

    logInfo(req, 'Add new score')
    res.status(200).json({ message: 'Success add new score' })
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error })
  }
}

export const updateScore = async (req: Request, res: Response) => {
  const { scoreId } = req.params

  if (!req.body.nilai) {
    logWarn(req, 'Nilai is required')
    return res.status(400).json({ message: 'Nilai is required' })
  }

  try {
    await ScoreService.changeScore(scoreId, req.body.nilai as number)

    logInfo(req, 'Change score')
    res.status(200).json({ message: 'Success change score' })
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error })
  }
}
