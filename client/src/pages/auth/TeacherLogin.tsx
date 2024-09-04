import { yupResolver } from '@hookform/resolvers/yup'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import { Brand, Password } from '@/components/atoms'

import * as TeacherValidation from '@/lib/validations/teacher.validation'
import * as TeacherServer from '@/store/server/useTeacher'

import { useTitle } from '@/hooks'

export default function TeacherLogin() {
  useTitle('Teacher Login')
  const navigate = useNavigate()
  const { mutate: login, isLoading } = TeacherServer.useLogin()

  const forms = useForm<TeacherValidation.LoginType>({
    mode: 'onTouched',
    resolver: yupResolver(TeacherValidation.validLogin)
  })

  const onSubmit = (values: TeacherValidation.LoginType) => {
    login(values, {
      onSuccess: () => {
        forms.reset()
        navigate('/teacher/game')
      }
    })
  }

  return (
    <section className="mx-auto flex min-h-screen w-full flex-col justify-center gap-[10px] px-5 py-8 tracking-wide md:w-[440px] md:p-0">
      <Brand className="static left-6 top-6 mb-5 flex-col text-primary md:absolute md:mb-0 md:flex-row" type="light" />

      <div className="flex flex-col">
        <h2 className="mb-2 text-2xl font-semibold text-dark md:text-[32px]">Masuk</h2>
        <p className="text-[13px] font-medium text-dark/60 md:text-sm">Selamat datang, silakan masukkan detail kamu</p>
      </div>

      <Form {...forms}>
        <form onSubmit={forms.handleSubmit(onSubmit)} className="mt-5 flex flex-col gap-6">
          <FormField
            name="email"
            control={forms.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel variant="teacher">Email</FormLabel>
                <FormControl>
                  <Input {...field} type="email" placeholder="johndoe@email.com" variant="teacher" />
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
                <div className="flex items-center justify-between">
                  <FormLabel variant="teacher">Kata Sandi</FormLabel>
                  <Link
                    to="/teacher/forgot-password"
                    className="text-xs font-medium text-primary hover:underline dark:text-white"
                  >
                    Lupa kata sandi?
                  </Link>
                </div>
                <FormControl>
                  <Password {...field} placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;" variant="teacher" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="rounded font-semibold text-white" type="submit" loading={isLoading}>
            Masuk
          </Button>
        </form>
      </Form>

      <Link to="/login" className="mt-7 text-center text-[15px] font-medium text-primary hover:underline">
        Masuk sebagai murid
      </Link>
    </section>
  )
}
