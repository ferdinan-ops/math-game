import { QuestionType } from '@/lib/types/question.type'
import api from './axiosInstance'
import { CreateQuestionType } from '@/lib/validations/question.validation'

export const getQuestionsFn = async (gameId: string): Promise<QuestionType[]> => {
  const response = await api.get(`/question/game/${gameId}`)
  return response.data?.data
}

export const createQuestionFn = async (payload: Omit<QuestionType, 'id'>) => {
  return await api.post('/question', payload)
}

export const getQuestionFn = async (questionId: string): Promise<QuestionType> => {
  const response = await api.get(`/question/${questionId}`)
  return response.data?.data
}

export const deleteQuestionFn = async (questionId: string) => {
  return await api.delete(`/question/${questionId}`)
}

type updateQuestionPayload = {
  questionId: string
} & CreateQuestionType

export const updateQuestionFn = async (payload: updateQuestionPayload) => {
  const { questionId, ...rest } = payload
  return await api.put(`/question/${questionId}`, rest)
}
