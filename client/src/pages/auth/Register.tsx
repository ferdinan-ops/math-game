import { yupResolver } from '@hookform/resolvers/yup'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import { Brand, Password } from '@/components/atoms'

import { registerDefaultValues } from '@/lib/defaultValues'
import * as StudentValidation from '@/lib/validations/student.validation'
import * as StudentServer from '@/store/server/useStudent'

import { useTitle } from '@/hooks'
import { Avatar } from '@/components/organisms'

export default function Register() {
  useTitle('Register')
  const navigate = useNavigate()
  const { mutate: register, isLoading } = StudentServer.useRegister()

  const forms = useForm<StudentValidation.RegisterType>({
    mode: 'onTouched',
    resolver: yupResolver(StudentValidation.validRegister)
  })

  const onSubmit = (values: StudentValidation.RegisterType) => {
    console.log({ values })
    register(values, {
      onSuccess: () => {
        forms.reset(registerDefaultValues)
        navigate('/login')
      }
    })
  }

  return (
    <section className="mx-auto flex min-h-screen w-full flex-col justify-center gap-[10px] px-5 py-8 md:w-[440px] md:p-0">
      <Brand className="static left-6 top-6 mb-5 flex-col text-white md:absolute md:mb-0 md:flex-row" />

      <div className="flex flex-col">
        <h2 className="mb-2 text-2xl font-semibold text-white dark:text-white md:text-[32px]">Buat Avatar</h2>
        <p className="text-[13px] font-medium text-white/60 md:text-sm">
          Daftar sekarang dan mulai belajar bersama kami
        </p>
      </div>
      <Form {...forms}>
        <form onSubmit={forms.handleSubmit(onSubmit)} className="mt-8 flex flex-col gap-5">
          <FormField
            name="avatar"
            control={forms.control}
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormControl>
                  <Avatar value={field.value} onChange={field.onChange} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="username"
            control={forms.control}
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel variant="student">Username</FormLabel>
                <FormControl>
                  <Input {...field} value={field.value ?? ''} placeholder="John Doe" variant="student" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="password"
            control={forms.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel variant="student">Kata Sandi</FormLabel>
                <FormControl>
                  <Password
                    {...field}
                    value={field.value ?? ''}
                    placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;"
                    variant="student"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button className="font-semibold" type="submit" loading={isLoading}>
            Daftar
          </Button>
        </form>
      </Form>
      <p className="mt-7 text-center text-[15px] text-white">
        Udah punya akun?{' '}
        <Link to="/login" className="font-medium text-success hover:underline dark:text-white">
          Masuk!
        </Link>
      </p>
    </section>
  )
}
