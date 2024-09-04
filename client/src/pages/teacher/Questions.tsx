import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

import { Loading } from '@/components/atoms'
import { useDeleteQuestion, useGetQuestions } from '@/store/server/useQuestion'
import * as React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { HiOutlinePencilSquare, HiOutlinePlus, HiOutlineTrash } from 'react-icons/hi2'
import { useGetGame } from '@/store/server/useGame'
import { useTitle } from '@/hooks'
import { Alert } from '@/components/organisms'

export default function Questions() {
  const navigate = useNavigate()
  const { gameId } = useParams<{ gameId: string }>()

  const { mutate: deleteQuestion } = useDeleteQuestion()
  const { data: game, isSuccess: isSuccessGame } = useGetGame(gameId as string)
  const { data: questions, isSuccess: isSuccessQuestion } = useGetQuestions(gameId as string)

  useTitle(`Soal - ${game?.nama_permainan}`)

  if (!isSuccessGame || !isSuccessQuestion) return <Loading />

  return (
    <React.Fragment>
      <section className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between md:gap-0">
        <div className="flex flex-col md:gap-2">
          <h2 className="text-2xl font-semibold text-dark dark:text-white md:text-[32px]">
            Soal: {game.nama_permainan}
          </h2>
          <p className="text-[13px] font-medium text-dark/50 md:text-sm">
            Berikut daftar soal yang terdaftar pada permainan ini
          </p>
        </div>
        <Button className="ml-auto w-fit gap-2" onClick={() => navigate(`/teacher/game/${gameId}/question/create`)}>
          <HiOutlinePlus />
          <span>Tambah Soal</span>
        </Button>
      </section>

      <Table className="mt-5 overflow-hidden rounded text-font md:mt-14">
        <TableHeader className="bg-primary/80">
          <TableRow className="border-zinc-300">
            <TableHead className="text-white">No</TableHead>
            <TableHead className="text-white">Soal</TableHead>
            <TableHead className="text-white">Jawaban</TableHead>
            <TableHead className="text-white">Skor</TableHead>
            <TableHead className="text-white">Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {questions.length > 0 ? (
            questions.map((question, index) => (
              <TableRow className="text-[13px]" key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell className="font-semibold">{question.soal}</TableCell>
                <TableCell>{question.jawaban}</TableCell>
                <TableCell>{question.skor}</TableCell>
                <TableCell className="w-fit">
                  <div className="flex w-fit items-center gap-3">
                    <Button
                      variant="outline"
                      className="items-center gap-3 font-normal"
                      onClick={() => navigate(`/teacher/game/${gameId}/question/${question.id}/update`)}
                    >
                      <HiOutlinePencilSquare />
                      Ubah
                    </Button>
                    <Alert
                      title="Anda yakin menghapus soal?"
                      desc="Tindakan ini tidak dapat dibatalkan. Tindakan ini akan menghapus soal secara permanen dari server kami."
                      btnText="hapus"
                      action={() => deleteQuestion(question.id)}
                    >
                      <Button variant="destructive" className="items-center gap-3 font-normal">
                        <HiOutlineTrash />
                        Hapus
                      </Button>
                    </Alert>
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} className="text-center italic text-zinc-500">
                Tidak ada data 😢
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </React.Fragment>
  )
}
