import { useMutation, useQuery, useQueryClient } from 'react-query'
import * as StudentApi from '@/api/student.api'
import { AxiosError } from 'axios'
import { handleOnError } from '@/lib/services/handleToast'
import { useToken, useUserInfo } from '../client'
import { toast } from '@/components/ui/use-toast'

export const useLogin = () => {
  return useMutation(StudentApi.loginFn, {
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

export const useRegister = () => {
  return useMutation(StudentApi.registerFn, {
    onError: (error: AxiosError) => {
      handleOnError(error)
    },
    onSuccess: () => {
      toast({
        title: 'Akun anda berhasil terdaftar',
        description: 'Silahkan login untuk melanjutkan'
      })
    }
  })
}

export const useResetPassword = () => {
  return useMutation(StudentApi.resetPasswordFn, {
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
  return useQuery('student', StudentApi.getMeFn)
}

export const useUpdateMe = () => {
  const queryClient = useQueryClient()
  return useMutation(StudentApi.updateMeFn, {
    onSuccess: () => {
      queryClient.invalidateQueries('student')
      toast({
        title: 'Berhasil mengupdate data',
        description: 'Data profil anda berhasil diupdate'
      })
    }
  })
}
