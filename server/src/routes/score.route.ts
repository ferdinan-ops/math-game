import express from 'express'
import * as ScoreController from '../controllers/score.controller'
import verifyJwt, { verifyStudent, verifyTeacher } from '../middlewares/jwt'

const scoreRouter = express.Router()

scoreRouter.get('/:subMateriId', verifyJwt, verifyTeacher, ScoreController.getAllScore)
scoreRouter.get('/me', verifyJwt, verifyStudent, ScoreController.getMyScore)
scoreRouter.post('/', verifyJwt, verifyStudent, ScoreController.storeScore)
scoreRouter.put('/:scoreId', verifyJwt, verifyStudent, ScoreController.updateScore)

export default scoreRouter
