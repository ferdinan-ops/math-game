import express from 'express'
import * as SubMaterController from '../controllers/sub-materi.controller'
import verifyJwt from '../middlewares/jwt'

const subMateriRoute = express.Router()

subMateriRoute.get('/', verifyJwt, SubMaterController.getAllSubMateri)
subMateriRoute.put('/:subMateriId', verifyJwt, SubMaterController.updateSubMateri)

export default subMateriRoute
