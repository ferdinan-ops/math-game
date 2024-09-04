import { Loading } from '@/components/atoms'
import { GameCard } from '@/components/organisms'
import { Button } from '@/components/ui/button'
import { useTitle } from '@/hooks'
import { useGetGames } from '@/store/server/useGame'
import * as React from 'react'
import { HiOutlineArrowRight } from 'react-icons/hi2'
import { useNavigate } from 'react-router-dom'

export default function Games() {
  useTitle('Games')
  const navigate = useNavigate()
  const { data: games, isSuccess } = useGetGames()

  if (!isSuccess) return <Loading />

  return (
    <React.Fragment>
      <section className="flex flex-col gap-2">
        <h2 className="text-2xl font-semibold text-dark dark:text-white md:text-[32px]">Daftar Permainan</h2>
        <p className="text-[13px] font-medium text-dark/50 md:text-sm">
          Berikut daftar permainan yang terdaftar pada sistem
        </p>
      </section>

      <section className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-12">
        {games.map((game) => (
          <GameCard key={game.id} className="bg-gradient-to-r from-primary to-primary/70 text-white">
            <GameCard.Left title={game.nama_permainan}>
              {game.nama_permainan.toLocaleLowerCase() !== 'bangun ruang' && (
                <Button
                  className="h-fit gap-2 bg-white text-[11px] text-primary hover:bg-zinc-200 hover:text-primary md:text-[13px]"
                  onClick={() => navigate(`/teacher/game/${game.id}/question`)}
                >
                  <span>Lihat soal</span>
                  <HiOutlineArrowRight />
                </Button>
              )}
            </GameCard.Left>
            <GameCard.Right
              src="https://api.hub.jhu.edu/factory/sites/default/files/styles/landscape/public/maths111319impact.jpg"
              alt="Perkalian"
              className="h-full w-[40%] rounded-md object-cover"
            />
          </GameCard>
        ))}
      </section>
    </React.Fragment>
  )
}
