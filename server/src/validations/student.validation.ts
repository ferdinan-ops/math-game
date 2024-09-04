import { type IStudent } from '../types/student.type'
import Joi from 'joi'

export const validRegister = (payload: IStudent) => {
  const schema = Joi.object<IStudent>({
    username: Joi.string().required(),
    password: Joi.string().required(),
    avatar: Joi.string().allow(null, '')
  })

  return schema.validate(payload)
}

export const validLogin = (payload: Omit<IStudent, 'avatar'>) => {
  const schema = Joi.object<Omit<IStudent, 'avatar'>>({
    username: Joi.string().required(),
    password: Joi.string().required()
  })

  return schema.validate(payload)
}

export const validUpdateStudent = (payload: Omit<IStudent, 'password'>) => {
  const schema = Joi.object<Omit<IStudent, 'password'>>({
    username: Joi.string().min(3).max(50),
    avatar: Joi.string().allow(null, '')
  })

  return schema.validate(payload)
}
