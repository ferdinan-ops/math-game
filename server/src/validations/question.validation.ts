import { type IAnswer, type IQuestion } from '../types/question.type'
import Joi from 'joi'

export const validCreate = (payload: IQuestion) => {
  const schema = Joi.object<IQuestion>({
    soal: Joi.string().required(),
    jawaban: Joi.string().required(),
    skor: Joi.number().required(),
    id_permainan: Joi.string().required()
  })

  return schema.validate(payload)
}

export const validUpdate = (payload: Omit<IQuestion, 'id_permainan'>) => {
  const schema = Joi.object<Omit<IQuestion, 'id_permainan'>>({
    soal: Joi.string(),
    jawaban: Joi.string(),
    skor: Joi.number()
  })

  return schema.validate(payload)
}

export const validAnswer = (payload: IAnswer) => {
  const schema = Joi.object<IAnswer>({
    id_soal: Joi.string().required(),
    jawaban: Joi.string().required()
  })

  return schema.validate(payload)
}
