import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'

import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import { Brand } from '@/components/atoms'

import { useVerifyEmail } from '@/store/server/useTeacher'
import { useTitle } from '@/hooks'

interface FormFields {
  token: string
}

export default function VerifyEmail() {
  useTitle('Verify Email')
  const navigate = useNavigate()
  const { mutate: verify, isLoading } = useVerifyEmail()

  const forms = useForm<FormFields>({
    mode: 'onTouched',
    defaultValues: { token: '' }
  })

  const onSubmit = (values: FormFields) => {
    verify(values.token, {
      onSuccess: () => {
        forms.reset({ token: '' })
        navigate('/teacher/login')
      }
    })
  }

  return (
    <section className="mx-auto flex min-h-screen w-full flex-col justify-center gap-[10px] px-5 py-8 md:w-[440px] md:p-0">
      <Brand className="static left-6 top-6 mb-5 flex-col text-primary md:absolute md:mb-0 md:flex-row" />
      <div className="flex flex-col">
        <h2 className="mb-2 text-2xl font-semibold text-primary dark:text-white md:text-[32px]">Verifikasi Email</h2>
        <p className="text-[13px] font-medium text-zinc-500 md:text-sm">
          We've sent the verification code to the email you registered.
        </p>
      </div>
      <Form {...forms}>
        <form onSubmit={forms.handleSubmit(onSubmit)} className="mt-8 flex flex-col gap-5">
          <FormField
            name="token"
            control={forms.control}
            rules={{ required: 'Kode verifikasi harus diisi' }}
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel className="font-semibold dark:text-white" variant="teacher">
                  Verification Code
                </FormLabel>
                <FormControl>
                  <Input {...field} placeholder="76d67hi" variant="teacher" />
                </FormControl>
              </FormItem>
            )}
          />

          <Button className="font-semibold" type="submit" loading={isLoading}>
            Verify
          </Button>
        </form>
      </Form>
    </section>
  )
}
