import { getGameFn, getGamesFn } from '@/api/game.api'
import { useQuery } from 'react-query'

export const useGetGames = () => {
  return useQuery('games', getGamesFn)
}

export const useGetGame = (gameId: string) => {
  return useQuery(['games', gameId], () => getGameFn(gameId))
}
