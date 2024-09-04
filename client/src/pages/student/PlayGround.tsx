import { Loading } from '@/components/atoms'
import { useGetQuestion } from '@/store/server/useQuestion'
import { useParams } from 'react-router-dom'

export default function PlayGround() {
  const { questionId } = useParams<{ gameId: string; questionId: string }>()
  // const { data: question, isSuccess } = useGetQuestion(questionId)

  // if (!isSuccess) return <Loading />

  return (
    <section className="flex flex-col gap-8">
      <div className="relative flex h-10 w-full items-center justify-between">
        <div className="absolute left-0 top-0 z-10 flex h-10 w-10 rounded-full border-4 border-dark bg-primary">
          <p className="m-auto font-semibold text-white">5</p>
        </div>
        <div className="relative z-0 h-6 w-full overflow-hidden rounded-full border-4 border-white/10 bg-white/5">
          <div className="h-full w-1/2 flex-1 bg-gradient-to-r from-primary to-success"></div>
        </div>
        <div className="absolute right-0 top-0 z-10 flex h-10 w-10 rounded-full border-4 border-dark bg-success">
          <p className="m-auto font-semibold text-dark">10</p>
        </div>
      </div>
      <div className="h-[285px] w-full rounded-xl border-4 border-dashed border-white/10 bg-white/5"></div>
      <div className="mx-auto grid w-10/12 grid-cols-2 gap-x-8 gap-y-4 text-center">
        <p className="rounded-lg border-2 border-white/10 bg-card-dark py-6 text-2xl font-bold text-white">120</p>
        <p className="rounded-lg border-2 border-white/10 bg-card-dark py-6 text-2xl font-bold text-white">120</p>
        <p className="rounded-lg border-2 border-white/10 bg-card-dark py-6 text-2xl font-bold text-white">120</p>
        <p className="rounded-lg border-2 border-white/10 bg-card-dark py-6 text-2xl font-bold text-white">120</p>
      </div>
    </section>
  )
}
