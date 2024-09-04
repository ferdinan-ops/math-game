import * as Yup from 'yup'

export const validLogin = Yup.object({
  email: Yup.string().email('Email tidak valid').required('Email harus diisi'),
  password: Yup.string().required('Kata sandi harus diisi')
})

export type LoginType = Yup.InferType<typeof validLogin>

export const validUpdateTeacher = Yup.object({
  fullname: Yup.string().required('Nama lengkap harus diisi'),
  username: Yup.string().required('Username harus diisi')
})

export type UpdateTeacherType = Yup.InferType<typeof validUpdateTeacher>

export const forgotPasswordValidation = Yup.object({
  email: Yup.string().email('Email tidak valid').required('Email harus diisi')
})

export type ForgotPasswordType = Yup.InferType<typeof forgotPasswordValidation>

export const resetPasswordValidation = Yup.object({
  token: Yup.string().required('Token harus diisi'),
  password: Yup.string()
    .required('Kata sandi harus diisi')
    .min(8, 'Harus lebih dari 8 karakter')
    .matches(/[a-z]/g, 'Harus mengandung setidaknya 1 huruf kecil')
    .matches(/[A-Z]/g, 'Harus mengandung setidaknya 1 huruf besar')
    .matches(/[0-9]/g, 'Harus mengandung setidaknya 1 angka')
    .matches(/^\S*$/g, 'Tidak boleh mengandung spasi'),
  confirmPassword: Yup.string()
    .required('Konfirmasi kata sandi harus diisi')
    .oneOf([Yup.ref('password')], 'Kata sandi harus cocok')
})

export type ResetPasswordType = {
  token?: string
  password: string
  confirmPassword: string
}

export const changePasswordValidation = Yup.object({
  password: Yup.string()
    .required('Kata sandi harus diisi')
    .min(8, 'Harus lebih dari 8 karakter')
    .matches(/[a-z]/g, 'Harus mengandung setidaknya 1 huruf kecil')
    .matches(/[A-Z]/g, 'Harus mengandung setidaknya 1 huruf besar')
    .matches(/[0-9]/g, 'Harus mengandung setidaknya 1 angka')
    .matches(/^\S*$/g, 'Tidak boleh mengandung spasi'),
  confirmPassword: Yup.string()
    .required('Konfirmasi kata sandi harus diisi')
    .oneOf([Yup.ref('password')], 'Kata sandi harus cocok')
})

export type ChangePasswordType = Yup.InferType<typeof changePasswordValidation>

export const updateEmailValidation = Yup.object({
  email: Yup.string().email('Email tidak valid').required('Email wajib diisi')
})

export type UpdateEmailType = Yup.InferType<typeof updateEmailValidation>

export const changeProfilePicValidation = Yup.object({
  photo: Yup.mixed().required('Foto profil wajib diisi')
})

export type ChangeProfilePicType = Yup.InferType<typeof changeProfilePicValidation>
