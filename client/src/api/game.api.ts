import { GameType } from '@/lib/types/game.type'
import api from './axiosInstance'

export const getGamesFn = async (): Promise<GameType[]> => {
  const response = await api.get('/game')
  return response.data?.data
}

export const getGameFn = async (gameId: string): Promise<GameType> => {
  const response = await api.get(`/game/${gameId}`)
  return response.data?.data
}
