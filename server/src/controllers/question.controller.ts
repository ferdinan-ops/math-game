import { type Request, type Response } from 'express'

import { logError, logInfo } from '../utils/logger'
import { type IAnswer, type IQuestion } from '../types/question.type'

import * as QuestionService from '../services/question.service'
import * as QuestionValidation from '../validations/question.validation'

export const getQuestions = async (req: Request, res: Response) => {
  const limit = req.query.limit ? parseInt(req.query.limit as string) : undefined

  try {
    let data = await QuestionService.findQuestionsByGameId(req.params.gameId)

    if (limit) {
      // acak urutan soal secara random
      data.sort(() => Math.random() - 0.5)

      // ambil 10 soal pertama
      data = data.slice(0, 10)
    }

    logInfo(req, 'Data soal berhasil didapatkan')
    res.status(200).json({ data, message: 'Data soal berhasil didapatkan' })
  } catch (error) {
    res.status(500).json({ error })
  }
}

export const getQuestion = async (req: Request, res: Response) => {
  try {
    const data = await QuestionService.findQuestionById(req.params.id)

    logInfo(req, 'Data soal berhasil didapatkan')
    res.status(200).json({ data, message: 'Data soal berhasil didapatkan' })
  } catch (error) {
    res.status(500).json({ error })
  }
}

export const createQuestion = async (req: Request, res: Response) => {
  const { value, error } = QuestionValidation.validCreate(req.body as IQuestion)
  if (error) {
    logError(req, error)
    return res.status(400).json({ error: error.details[0].message })
  }

  try {
    await QuestionService.addNewQuestion(value)

    logInfo(req, 'Soal berhasil dibuat')
    res.status(201).json({ message: 'Soal berhasil dibuat' })
  } catch (error) {
    res.status(500).json({ error })
  }
}

export const deleteQuestion = async (req: Request, res: Response) => {
  try {
    await QuestionService.removeQuestionById(req.params.id)

    logInfo(req, 'Soal berhasil dihapus')
    res.status(200).json({ message: 'Soal berhasil dihapus' })
  } catch (error) {
    res.status(500).json({ error })
  }
}

export const updateQuestion = async (req: Request, res: Response) => {
  const { value, error } = QuestionValidation.validUpdate(req.body as Omit<IQuestion, 'id_permainan'>)
  if (error) {
    logError(req, error)
    return res.status(400).json({ error: error.details[0].message })
  }

  try {
    await QuestionService.updateQuestionById(req.params.id, value)

    logInfo(req, 'Soal berhasil diupdate')
    res.status(200).json({ message: 'Soal berhasil diupdate' })
  } catch (error) {
    res.status(500).json({ error })
  }
}

export const checkAnswer = async (req: Request, res: Response) => {
  const { value, error } = QuestionValidation.validAnswer(req.body as IAnswer)
  if (error) {
    logError(req, error)
    return res.status(400).json({ error: error.details[0].message })
  }

  try {
    const data = await QuestionService.findQuestionById(value.id_soal)
    if (!data) {
      logError(req, 'Soal tidak ditemukan')
      return res.status(404).json({ error: 'Soal tidak ditemukan' })
    }

    if (data.jawaban === value.jawaban) {
      logInfo(req, 'Jawaban benar')
      await QuestionService.addNewScore(data.skor, req.userId as string)
      res.status(200).json({ message: 'Jawaban benar' })
    } else {
      logInfo(req, 'Jawaban salah')
      res.status(200).json({ message: 'Jawaban salah' })
    }
  } catch (error) {
    res.status(500).json({ error })
  }
}
