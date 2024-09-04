/* eslint-disable no-useless-escape */
import { Loading } from '@/components/atoms'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useTitle } from '@/hooks'
import { CreateQuestionType, validQuestion } from '@/lib/validations/question.validation'
import { useGetGame } from '@/store/server/useGame'
import { useCreateQuestion, useGetQuestion, useUpdateQuestion } from '@/store/server/useQuestion'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { HiOutlineBookOpen } from 'react-icons/hi2'
import { Navigate, useNavigate, useParams } from 'react-router-dom'

import * as React from 'react'

export default function CreateQuestion() {
  const navigate = useNavigate()
  const { gameId, questionId } = useParams<{ gameId: string; questionId?: string }>()

  const { data: game, isSuccess } = useGetGame(gameId as string)
  const { data: question, isSuccess: isSuccessQuestion } = useGetQuestion(questionId)
  const { mutate: createQuestion, isLoading: isLoadingCreate } = useCreateQuestion()
  const { mutate: updateQuestion, isLoading: isLoadingUpdate } = useUpdateQuestion()

  useTitle(`Tambah Soal - ${game?.nama_permainan}`)

  const forms = useForm<CreateQuestionType>({
    mode: 'onTouched',
    resolver: yupResolver(validQuestion)
  })

  React.useEffect(() => {
    if (isSuccessQuestion && questionId && question) {
      forms.setValue('soal', question.soal)
      forms.setValue('jawaban', question.jawaban)
      forms.setValue('skor', question.skor)
    }
  }, [questionId, isSuccessQuestion, forms, question])

  const onSubmit = (values: CreateQuestionType) => {
    if (questionId) {
      const payload = { ...values, questionId }
      return updateQuestion(payload, {
        onSuccess: () => {
          navigate(`/teacher/game/${gameId}/question`)
        }
      })
    }

    const payload = { ...values, id_permainan: gameId as string }
    createQuestion(payload, {
      onSuccess: () => {
        navigate(`/teacher/game/${gameId}/question`)
      }
    })
  }

  const handleChangeOnlyNumber = (value: string) => {
    return value ? value.replace(/[^0-9]/g, '') : ''
  }

  const handleChangeOnlyNumberAndOperator = (value: string) => {
    switch (game?.nama_permainan.toLocaleLowerCase()) {
      case 'perkalian':
        return value ? value.replace(/[^0-9\*\(\)]/g, '') : ''
      case 'pecahan':
        return value ? value.replace(/[^0-9\/\+\-\*\(\)]/g, '') : ''
      case 'desimal':
        return value ? value.replace(/[^0-9\+\-\*\.\(\)]/g, '') : ''
    }
  }

  if (!isSuccess) return <Loading />
  if (isSuccessQuestion && questionId && !question) return <Navigate to="/404" />

  return (
    <div className="mx-auto w-full md:w-6/12">
      <section className="flex flex-col md:gap-2">
        <h2 className="text-2xl font-semibold text-dark md:text-[32px]">
          {questionId ? 'Ubah' : 'Tambah'} Soal: {game.nama_permainan}
        </h2>
        <p className="text-[13px] font-medium text-dark/50 md:text-sm">
          Isi form di bawah ini untuk menambahkan soal pada permainan ini
        </p>
      </section>

      <Button
        className="mt-8 gap-2.5 bg-success text-dark hover:bg-success/70"
        onClick={() => navigate(`/teacher/game/${gameId}/question/create/guide`)}
      >
        <HiOutlineBookOpen className="text-lg" />
        <span>Baca Petunjuk Dulu</span>
      </Button>

      <Form {...forms}>
        <form onSubmit={forms.handleSubmit(onSubmit)} className="mt-8 flex flex-col gap-6">
          <FormField
            name="soal"
            control={forms.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel variant="teacher">Soal</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    value={field.value ?? ''}
                    onInput={(e) => {
                      const value = e.currentTarget.value
                      e.currentTarget.value = handleChangeOnlyNumberAndOperator(value) || ''
                    }}
                    placeholder="23*24*34"
                    variant="teacher"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="jawaban"
            control={forms.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel variant="teacher">Jawaban</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    value={field.value ?? ''}
                    onInput={(e) => {
                      const value = e.currentTarget.value
                      e.currentTarget.value = handleChangeOnlyNumber(value) || ''
                    }}
                    placeholder="18768"
                    variant="teacher"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="skor"
            control={forms.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel variant="teacher">Skor (50-500)</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    value={field.value ?? ''}
                    onInput={(e) => {
                      const value = e.currentTarget.value
                      e.currentTarget.value = handleChangeOnlyNumber(value) || ''
                    }}
                    placeholder="100"
                    variant="teacher"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            className="ml-auto w-fit rounded font-medium"
            type="submit"
            loading={isLoadingCreate || isLoadingUpdate}
          >
            Submit
          </Button>
        </form>
      </Form>
    </div>
  )
}
