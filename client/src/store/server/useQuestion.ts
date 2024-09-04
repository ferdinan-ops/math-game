import { createQuestionFn, deleteQuestionFn, getQuestionFn, getQuestionsFn, updateQuestionFn } from '@/api/question.api'
import { toast } from '@/components/ui/use-toast'
import { useMutation, useQuery, useQueryClient } from 'react-query'

export const useGetQuestions = (gameId: string) => {
  return useQuery(['questions', gameId], () => getQuestionsFn(gameId))
}

export const useGetQuestion = (questionId?: string) => {
  return useQuery(['questions', questionId], () => getQuestionFn(questionId as string), {
    enabled: !!questionId
  })
}

export const useCreateQuestion = () => {
  const queryClient = useQueryClient()
  return useMutation(createQuestionFn, {
    onSuccess: () => {
      queryClient.invalidateQueries('questions')
      toast({
        title: 'Berhasil membuat soal baru',
        description: 'Soal baru telah berhasil tersimpan dalam sistem'
      })
    }
  })
}

export const useDeleteQuestion = () => {
  const queryClient = useQueryClient()
  return useMutation(deleteQuestionFn, {
    onSuccess: () => {
      queryClient.invalidateQueries('questions')
      toast({
        title: 'Berhasil menghapus soal',
        description: 'Soal telah berhasil dihapus dalam sistem'
      })
    }
  })
}

export const useUpdateQuestion = () => {
  const queryClient = useQueryClient()

  return useMutation(updateQuestionFn, {
    onSuccess: () => {
      queryClient.invalidateQueries('questions')
      toast({
        title: 'Berhasil mengubah soal',
        description: 'Soal telah berhasil diubah dalam sistem'
      })
    }
  })
}
