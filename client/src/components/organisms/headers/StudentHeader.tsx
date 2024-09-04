import * as StundentServer from '@/store/server/useStudent'

export default function StudentHeader() {
  const { data: student } = StundentServer.useGetMe()

  return (
    <header className="mx-6 mt-6 flex h-20 items-center justify-between rounded-lg border-2 border-white/10 bg-card-dark px-6 md:mx-auto md:w-6/12">
      <article className="flex items-center gap-5">
        <img src={student?.avatar} alt={student?.username} className="w-12" />
        <div className="flex flex-col gap-0">
          <p className="font-semibold text-white">{student?.username}</p>
          <p className="text-[13px] text-white/60">Kelas 4</p>
        </div>
      </article>
      <div className="h-fit rounded-md bg-primary px-4 py-2 text-sm font-semibold text-white md:px-10 md:py-3 md:text-base">
        {student?.skor} Poin
      </div>
    </header>
  )
}
