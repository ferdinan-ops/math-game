import { yupResolver } from '@hookform/resolvers/yup'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import { Brand, Password } from '@/components/atoms'

import * as StudentValidation from '@/lib/validations/student.validation'
import * as StudentServer from '@/store/server/useStudent'

import { useTitle } from '@/hooks'
import { HiOutlineArrowRight } from 'react-icons/hi2'

export default function Login() {
  useTitle('Login')
  const navigate = useNavigate()
  const { mutate: login, isLoading } = StudentServer.useLogin()

  const forms = useForm<StudentValidation.LoginType>({
    mode: 'onTouched',
    resolver: yupResolver(StudentValidation.validLogin)
  })

  const onSubmit = (values: StudentValidation.LoginType) => {
    login(values, {
      onSuccess: () => {
        forms.reset()
        navigate('/')
      }
    })
  }

  return (
    <section className="mx-auto flex min-h-screen w-full flex-col justify-center gap-[10px] px-5 py-8 md:w-[440px] md:p-0">
      <Brand className="static left-6 top-6 mb-5 flex-col text-white md:absolute md:mb-0 md:flex-row" />

      <div className="flex flex-col">
        <h2 className="mb-2 text-2xl font-semibold text-white md:text-[32px]">Masuk</h2>
        <p className="text-[13px] font-medium text-white/60 md:text-sm">Selamat datang, silakan masukkan detail kamu</p>
      </div>

      <Form {...forms}>
        <form onSubmit={forms.handleSubmit(onSubmit)} className="mt-5 flex flex-col gap-6">
          <FormField
            name="username"
            control={forms.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel variant="student">Username</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="John Doe" variant="student" />
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
                  <Password {...field} placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;" variant="student" />
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
      <div className="mt-7 flex items-center justify-center gap-1 text-center text-[15px] text-white">
        <p>Kamu belum punya akun?</p>
        <Link to="/register" className="flex items-center gap-1 font-medium text-success hover:underline">
          Ayo daftar
          <HiOutlineArrowRight />
        </Link>
      </div>
      <div className="my-3 flex items-center justify-between gap-[11px]">
        <div className="h-[2px] w-full rounded-full bg-white/10" />
        <p className="text-center text-[15px] font-medium text-white/60">Atau</p>
        <div className="h-[2px] w-full rounded-full bg-white/10" />
      </div>

      <Link to="/teacher/login" className="text-center text-[15px] font-medium text-success hover:underline">
        Masuk sebagai guru
      </Link>
    </section>
  )
}
