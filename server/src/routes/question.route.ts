import express from 'express'

import verifyJwt from '../middlewares/jwt'
import * as QuestionController from '../controllers/question.controller'

const questionRoute = express.Router()

questionRoute.get('/game/:gameId', QuestionController.getQuestions)
questionRoute.get('/:id', QuestionController.getQuestion)
questionRoute.post('/', verifyJwt, QuestionController.createQuestion)
questionRoute.delete('/:id', verifyJwt, QuestionController.deleteQuestion)
questionRoute.put('/:id', verifyJwt, QuestionController.updateQuestion)
questionRoute.post('/check-answer', verifyJwt, QuestionController.checkAnswer)

export default questionRoute
