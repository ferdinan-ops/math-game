import { Alert, EditEmail, UploadPhoto } from '@/components/organisms'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useToast } from '@/components/ui/use-toast'
import { useTitle } from '@/hooks'
import { useToken, useUserInfo } from '@/store/client'
import * as TeacherServer from '@/store/server/useTeacher'
import * as TeacherValidation from '@/lib/validations/teacher.validation'

import * as React from 'react'
import { useForm } from 'react-hook-form'
import { HiOutlineArrowLeftOnRectangle, HiOutlineLockClosed } from 'react-icons/hi2'
import { useNavigate } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'
import { TeacherType } from '@/lib/types/teacher.type'

export default function EditProfile() {
  useTitle('Edit Profile')

  const navigate = useNavigate()
  const { toast } = useToast()
  const removeToken = useToken((state) => state.removeAccessToken)
  const removeUser = useUserInfo((state) => state.removeUser)

  const { mutate: updateMe, isLoading } = TeacherServer.useUpdateMe()
  const { data: teacher, isSuccess } = TeacherServer.useGetMe()

  const forms = useForm<TeacherValidation.UpdateTeacherType>({
    mode: 'onTouched',
    resolver: yupResolver(TeacherValidation.validUpdateTeacher)
  })

  React.useEffect(() => {
    if (isSuccess) {
      forms.setValue('fullname', teacher?.fullname as string)
      forms.setValue('username', teacher?.username as string)
    }
  }, [teacher, forms, isSuccess])

  const onSubmit = (values: TeacherValidation.UpdateTeacherType) => {
    updateMe(values)
  }

  const handleLogout = () => {
    removeToken()
    removeUser()

    toast({
      title: 'Logout berhasil',
      description: 'Anda telah keluar dari aplikasi'
    })

    navigate('/teacher/login')
  }

  return (
    <div className="mx-auto w-full md:w-6/12">
      <section className="flex flex-col md:gap-2">
        <h2 className="text-2xl font-semibold text-dark md:text-[32px]">Profil Anda</h2>
        <p className="text-[13px] font-medium text-dark/50 md:text-sm">Anda dapat mengubah data diri Anda di sini</p>
      </section>
      <section className="mt-[84px] flex flex-col items-center">
        <UploadPhoto user={teacher as TeacherType} />
        <Form {...forms}>
          <form onSubmit={forms.handleSubmit(onSubmit)} className="mt-5 flex w-full flex-col gap-6">
            <FormField
              name="fullname"
              control={forms.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel variant="teacher">Nama Lengkap</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="John.doe" variant="teacher" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="username"
              control={forms.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel variant="teacher">Username</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="john.doe" variant="teacher" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button className="ml-auto w-fit rounded font-medium" type="submit" loading={isLoading}>
              Simpan Perubahan
            </Button>
          </form>
        </Form>
      </section>

      <section className="mt-8 flex items-center gap-4 border-t pt-5">
        <Button
          variant="outline"
          className="w-fit flex-1 gap-2.5 text-xs"
          onClick={() => navigate('/teacher/profile/change-password')}
        >
          <HiOutlineLockClosed className="text-lg" />
          Reset Password
        </Button>
        <EditEmail email={teacher?.email as string} />
        <Alert
          title="Anda yakin keluar dari aplikasi?"
          desc="Tindakan ini akan mengeluarkan akun Anda dari aplikasi kami. Namun Anda bisa kembali lagi dengan login."
          btnText="keluar"
          action={handleLogout}
        >
          <Button className="w-fit flex-1 gap-2.5 text-xs" variant="destructive">
            <HiOutlineArrowLeftOnRectangle className="text-lg" />
            Keluar
          </Button>
        </Alert>
      </section>
    </div>
  )
}
