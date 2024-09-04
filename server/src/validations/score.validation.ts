import Joi from 'joi'
import { type IScore } from '../types/score.type'

export const validStoreScore = (payload: IScore) => {
  const schema = Joi.object<IScore>({
    nilai: Joi.number().required(),
    id_siswa: Joi.string().required(),
    id_sub_materi: Joi.string().required()
  })

  return schema.validate(payload)
}
