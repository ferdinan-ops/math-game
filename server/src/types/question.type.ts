export interface IQuestion {
  soal: string
  jawaban: string
  skor: number
  id_permainan: string
}

export interface IAnswer {
  id_soal: string
  jawaban: string
}
