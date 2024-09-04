import { Loading } from '@/components/atoms'
import { GameCard } from '@/components/organisms'
import { Button } from '@/components/ui/button'
import { useGetGames } from '@/store/server/useGame'
import * as React from 'react'
import { HiOutlineArrowRight } from 'react-icons/hi2'

export default function Home() {
  const { data: games, isSuccess } = useGetGames()

  if (!isSuccess) return <Loading className="text-2xl" />

  return (
    <React.Fragment>
      <h3 className="mb-5 text-lg font-semibold text-white">Semua Permainan</h3>
      <section className="flex flex-col gap-7">
        {games.map((game) => (
          <GameCard
            key={game.id}
            className="border-2 border-white/10 bg-gradient-to-r from-white/10 to-white/5 text-white md:px-8"
          >
            <GameCard.Left title={game.nama_permainan}>
              <Button className="mt-auto h-fit gap-2 md:text-[13px]">
                <span>Mulai Permainan</span>
                <HiOutlineArrowRight />
              </Button>
            </GameCard.Left>
            <GameCard.Right
              src="https://api.hub.jhu.edu/factory/sites/default/files/styles/landscape/public/maths111319impact.jpg"
              alt="Perkalian"
              className="w-[40%] rounded-md object-cover"
            />
          </GameCard>
        ))}
      </section>
    </React.Fragment>
  )
}
