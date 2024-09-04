import { useMutation, useQuery, useQueryClient } from 'react-query'
import * as TeacherApi from '@/api/teacher.api'
import { AxiosError } from 'axios'
import { handleOnError } from '@/lib/services/handleToast'
import { useToken, useUserInfo } from '../client'
import { toast } from '@/components/ui/use-toast'

export const useLogin = () => {
  return useMutation(TeacherApi.loginFn, {
    onError: (error: AxiosError) => {
      handleOnError(error)
    },
    onSuccess: (data) => {
      useToken.getState().storeAccessToken(data.access_token)
      useUserInfo.getState().setUser({ role: data.role })
      toast({
        title: 'Login berhasil',
        description: 'Selamat datang di Sigma Math'
      })
    }
  })
}

export const useVerifyEmail = () => {
  return useMutation(TeacherApi.verifyEmailFn, {
    onError: (error: AxiosError) => {
      handleOnError(error)
    },
    onSuccess: () => {
      toast({
        title: 'Email berhasil diverifikasi',
        description: 'Silahkan login untuk melanjutkan'
      })
    }
  })
}

export const useForgotPassword = () => {
  return useMutation(TeacherApi.forgotPasswordFn, {
    onError: (error: AxiosError) => {
      handleOnError(error)
    },
    onSuccess: () => {
      toast({
        title: 'Email berhasil dikirim',
        description: 'Silahkan cek email anda untuk mengatur ulang kata sandi'
      })
    }
  })
}

export const useResetPassword = () => {
  return useMutation(TeacherApi.resetPasswordFn, {
    onError: (error: AxiosError) => {
      handleOnError(error)
    },
    onSuccess: () => {
      toast({
        title: 'Kata sandi berhasil direset',
        description: 'Silahkan login untuk melanjutkan'
      })
    }
  })
}

export const useGetMe = () => {
  return useQuery('teacher', TeacherApi.getMeFn)
}

export const useUpdateMe = () => {
  const queryClient = useQueryClient()
  return useMutation(TeacherApi.updateMeFn, {
    onSuccess: () => {
      queryClient.invalidateQueries('teacher')
      toast({
        title: 'Berhasil mengupdate data',
        description: 'Data profil anda berhasil diupdate'
      })
    }
  })
}

export const useChangePassword = () => {
  return useMutation(TeacherApi.changePasswordFn, {
    onSuccess: () => {
      toast({
        title: 'Berhasil mengupdate kata sandi',
        description: 'Kata sandi anda berhasil diupdate'
      })
    }
  })
}

export const useUpdateEmail = () => {
  const queryClient = useQueryClient()
  return useMutation(TeacherApi.updateEmailFn, {
    onSuccess: () => {
      queryClient.invalidateQueries('teacher')
      toast({
        title: 'Berhasil mengupdate email',
        description: 'Email anda berhasil diupdate'
      })
    }
  })
}

export const useUpdateProfilePic = () => {
  const queryClient = useQueryClient()
  return useMutation(TeacherApi.uploadProfilePicFn, {
    onSuccess: () => {
      queryClient.invalidateQueries('teacher')
      toast({
        title: 'Berhasil mengupdate foto profil',
        description: 'Foto profil anda berhasil diupdate'
      })
    }
  })
}
