import express from 'express'
import * as MateriController from '../controllers/materi.controller'
import verifyJwt from '../middlewares/jwt'

const materiRoute = express.Router()

materiRoute.get('/', verifyJwt, MateriController.getAllMateri)
materiRoute.get('/:materiId', verifyJwt, MateriController.getMateri)

export default materiRoute
