import { useLocation, useNavigate } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import { Brand, Password } from '@/components/atoms'

import {
  ResetPasswordType,
  changePasswordValidation,
  resetPasswordValidation
} from '@/lib/validations/teacher.validation'
import { resetPasswordDefaultValues } from '@/lib/defaultValues'

import { useChangePassword, useResetPassword } from '@/store/server/useTeacher'
import { useTitle } from '@/hooks'

const CHANGE_PASSWORD = '/teacher/profile/change-password'

export default function TeacherResetPassword() {
  useTitle('Reset Password')
  const navigate = useNavigate()
  const location = useLocation()
  const isChangePassword = CHANGE_PASSWORD === location.pathname

  const { mutate: resetPassword, isLoading } = useResetPassword()
  const { mutate: changePassword, isLoading: isLoadingChange } = useChangePassword()

  const forms = useForm<ResetPasswordType>({
    mode: 'onTouched',
    resolver: yupResolver(isChangePassword ? changePasswordValidation : resetPasswordValidation),
    defaultValues: resetPasswordDefaultValues
  })

  const onSubmit = (values: ResetPasswordType) => {
    if (!isChangePassword) {
      return resetPassword(values, {
        onSuccess: () => {
          forms.reset(resetPasswordDefaultValues)
          navigate('/teacher/login')
        }
      })
    }

    const data = { password: values.password, confirmPassword: values.confirmPassword }
    return changePassword(data, {
      onSuccess: () => {
        forms.reset(resetPasswordDefaultValues)
        navigate('/teacher/profile')
      }
    })
  }

  return (
    <section className="mx-auto flex min-h-screen w-full flex-col justify-center gap-[10px] px-5 py-8 tracking-wide md:w-[440px] md:p-0">
      <Brand className="static left-6 top-6 mb-5 flex-col md:absolute md:mb-0 md:flex-row" type="light" />

      <div className="flex flex-col">
        <h2 className="mb-2 text-2xl font-semibold text-primary md:text-[32px]">Atur Ulang Kata Sandi</h2>
        <p className="text-[13px] font-medium text-zinc-500 md:text-sm">Pilih kata sandi baru untuk akun kamu</p>
      </div>
      <Form {...forms}>
        <form onSubmit={forms.handleSubmit(onSubmit)} className="mt-8 flex flex-col gap-5">
          {!isChangePassword && (
            <FormField
              name="token"
              control={forms.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel variant="teacher">Kode Verifikasi</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="76d67hi" variant="teacher" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          <FormField
            name="password"
            control={forms.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel variant="teacher">Kata Sandi Baru</FormLabel>
                <FormControl>
                  <Password {...field} placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;" variant="teacher" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="confirmPassword"
            control={forms.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel variant="teacher">Konfirmasi Kata Sandi Baru</FormLabel>
                <FormControl>
                  <Password {...field} placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;" variant="teacher" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="font-semibold" type="submit" loading={isLoading || isLoadingChange}>
            Reset Password
          </Button>
        </form>
      </Form>
    </section>
  )
}
