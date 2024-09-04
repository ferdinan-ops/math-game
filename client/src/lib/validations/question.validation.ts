import * as Yup from 'yup'

export const validQuestion = Yup.object({
  soal: Yup.string().required('Soal harus diisi'),
  jawaban: Yup.string().required('Jawaban harus diisi'),
  skor: Yup.number().required('Skor harus diisi').min(50, 'Skor minimal 50').max(500, 'Skor maksimal 500')
})

export type CreateQuestionType = Yup.InferType<typeof validQuestion>
