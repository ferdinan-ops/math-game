import * as Yup from 'yup'

export const validRegister = Yup.object({
  username: Yup.string().required('Username harus diisi'),
  password: Yup.string()
    .required('Kata sandi harus diisi')
    .min(8, 'Harus lebih dari 8 karakter')
    .matches(/[a-z]/g, 'Harus mengandung setidaknya 1 huruf kecil')
    .matches(/[A-Z]/g, 'Harus mengandung setidaknya 1 huruf besar')
    .matches(/[0-9]/g, 'Harus mengandung setidaknya 1 angka')
    .matches(/^\S*$/g, 'Tidak boleh mengandung spasi'),

  avatar: Yup.string().required('Avatar harus diisi')
})

export type RegisterType = Yup.InferType<typeof validRegister>

export const validLogin = Yup.object({
  username: Yup.string().required('Username harus diisi'),
  password: Yup.string().required('Kata sandi harus diisi')
})

export type LoginType = Yup.InferType<typeof validLogin>

export const validUpdateStudent = Yup.object({
  username: Yup.string().required('Username harus diisi'),
  avatar: Yup.string().required('Avatar harus diisi')
})

export type UpdateStudentType = Yup.InferType<typeof validUpdateStudent>
