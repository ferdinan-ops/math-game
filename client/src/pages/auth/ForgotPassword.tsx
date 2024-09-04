import { yupResolver } from '@hookform/resolvers/yup'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'

import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import { Brand } from '@/components/atoms'

import * as TeacherValidation from '@/lib/validations/teacher.validation'
import * as TeacherServer from '@/store/server/useTeacher'

import { useTitle } from '@/hooks'
import { cn } from '@/lib/utils'

interface ForgotPasswordProps {
  variant: 'teacher' | 'student'
}

export default function ForgotPassword({ variant }: ForgotPasswordProps) {
  useTitle('Forgot Password')
  const navigate = useNavigate()
  const { mutate: forgotPassword, isLoading } = TeacherServer.useForgotPassword()

  const forms = useForm<TeacherValidation.ForgotPasswordType>({
    mode: 'onTouched',
    resolver: yupResolver(TeacherValidation.forgotPasswordValidation),
    defaultValues: { email: '' }
  })

  const onSubmit = (values: TeacherValidation.ForgotPasswordType) => {
    forgotPassword(values.email, {
      onSuccess: () => {
        forms.reset({ email: '' })
        navigate('/teacher/reset-password')
      }
    })
  }

  return (
    <section className="mx-auto flex min-h-screen w-full flex-col justify-center gap-[10px] px-5 py-8 tracking-wide md:w-[440px] md:p-0">
      <Brand
        className="static left-6 top-6 mb-5 flex-col md:absolute md:mb-0 md:flex-row"
        type={variant === 'student' ? 'dark' : 'light'}
      />

      <div className="flex flex-col">
        <h2
          className={cn(
            'mb-2 text-2xl font-semibold md:text-[32px]',
            variant === 'student' ? 'text-white' : 'text-primary'
          )}
        >
          Lupa kata sandi
        </h2>
        <p className="text-[13px] font-medium text-zinc-500 md:text-sm">
          Masukkan email yang kamu gunakan untuk membuat akun agar kami dapat mengirimkan instruksi tentang cara
          mengatur ulang kata sandi.
        </p>
      </div>
      <Form {...forms}>
        <form onSubmit={forms.handleSubmit(onSubmit)} className="mt-8 flex flex-col gap-5">
          <FormField
            name="email"
            control={forms.control}
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel variant={variant}>Email</FormLabel>
                <FormControl>
                  <Input {...field} type="email" placeholder="johndoe@email.com" variant={variant} />
                </FormControl>
              </FormItem>
            )}
          />

          <Button className="font-semibold" type="submit" loading={isLoading}>
            Kirim
          </Button>
        </form>
      </Form>
    </section>
  )
}
