import { type ITeacher } from '../types/teacher.type'
import Joi from 'joi'

export type ITeacherUpdate = Pick<ITeacher, 'fullname' | 'username'>

export const validUpdateTeacher = (payload: ITeacherUpdate) => {
  const schema = Joi.object<ITeacherUpdate>({
    fullname: Joi.string().min(3).max(50),
    username: Joi.string().min(3).max(50)
  })

  return schema.validate(payload)
}

export type ITeacherLogin = Pick<ITeacher, 'email' | 'password'>

export const validLogin = (payload: ITeacherLogin) => {
  const schema = Joi.object<ITeacherLogin>({
    email: Joi.string().required(),
    password: Joi.string().required()
  })

  return schema.validate(payload)
}

export interface IResetPassword {
  password: string
  token: string
}

export const validResetPassword = (payload: IResetPassword) => {
  const schema = Joi.object<IResetPassword>({
    token: Joi.string().required(),
    password: Joi.string().required()
  })

  return schema.validate(payload)
}
