export default function CreateQuestionGuide() {
  return (
    <div className="mx-auto flex w-full flex-col gap-8 text-dark md:w-8/12">
      <h2 className="text-2xl font-semibold md:text-[32px]">Panduan Mengisi Formulir Soal</h2>
      <ul className="flex flex-col gap-5 text-xs font-normal leading-relaxed md:gap-8 md:text-sm">
        <li>
          Selamat datang di panduan mengisi formulir soal. Pada formulir pengisian soal baru, Anda akan diminta untuk
          mengisi 3 inputan yaitu soal, jawaban, dan skor. Silakan ikuti petunjuk berikut agar inputan Anda dapat
          diterima dengan baik oleh sistem.
        </li>
        <ul className="flex flex-col gap-1">
          <li className="font-bold uppercase text-primary md:text-lg">Inputan Soal</li>
          <li className="font-semibold">Permainan Perkalian</li>
          <ul className="ml-7 flex list-disc flex-col gap-1">
            <li>Pada bagian ini, Anda dapat memasukkan soal perkalian dengan menggunakan tanda * sebagai operasi.</li>
            <li>Anda bebas memasukkan sebanyak mungkin bilangan yang ingin dikalikan.</li>
            <li>
              Contoh, Angka 24 dikalikan dengan 34, dan dikalikan lagi dengan 56:{' '}
              <b className="bg-zinc-400 p-1">24*34*56</b>
            </li>
          </ul>

          <li className="mt-4 font-semibold">Permainan Pecahan</li>
          <ul className="ml-7 flex list-disc flex-col gap-1">
            <li>
              Pada bagian pecahan, Anda dapat menggunakan bilangan pecahan dengan operasi tambah (+), kurang (-), dan
              kali (*)
            </li>
            <li>Silakan memasukkan pecahan dalam format yang benar dan gunakan tanda operasi yang sesuai</li>
            <li>
              Contoh, Pecahan 1/2 ditambah dengan 3/4, dikurangi dengan 6/7, dan dikalikan dengan 5/6:{' '}
              <b className="bg-zinc-400 p-1">1/2+3/4-6/7*5/6</b>
            </li>
          </ul>

          <li className="mt-4 font-semibold">Permainan Desimal</li>
          <ul className="ml-7 flex list-disc flex-col gap-1">
            <li>
              Untuk bagian desimal, masukkan bilangan desimal dengan menggunakan tanda titik (.) untuk menyatakan
              desimal.
            </li>
            <li>Operasi yang dapat digunakan adalah tambah (+), kurang (-), dan kali (*). </li>
            <li>Silakan memasukkan desimal dalam format yang benar dan gunakan tanda operasi yang sesuai</li>
            <li>
              Contoh, Bilangan 0.2 ditambah dengan 8.7, dikurangi dengan 8.7, dan dikalikan dengan 0.8:{' '}
              <b className="bg-zinc-400 p-1">0.2+8.7-8.7*0.8</b>
            </li>
          </ul>

          <li className="mt-4 font-semibold">Permainan Bangun Ruang</li>
          <ul className="ml-7 flex list-disc flex-col gap-1">
            <li>
              Pada permainan bangun ruang pengguna yaitu guru tidak dapat membuat soal, karena soal sudah diatur oleh
              sistem.
            </li>
            <li>Sistem mengatur seluruh jenis bentuk bangun ruang yang akan ditampilkan kepada murid</li>
            <li>Murid hanya perlu menjawab nama dari bangun ruang yang ditampilkan</li>
            <li>Sistem mengatur agar setiap soal memiliki skor yang sama</li>
          </ul>

          <li className="mt-4 font-semibold">Aturan Umum</li>
          <ul className="ml-7 flex list-disc flex-col gap-1">
            <li>Pengguna hanya dapat menggunakan 3 jenis operasi yaitu tambah (+), kurang (-), dan kali (*).</li>
            <li>
              Jangan menggunakan spasi, huruf alphabet, atau karakter lain dalam inputan soal karena sistem akan
              menanggulanginya.
            </li>
          </ul>
        </ul>

        <ul className="flex flex-col gap-1">
          <li className="font-bold uppercase text-primary md:text-lg">Inputan Jawaban</li>
          <li className="font-normal">
            Pada bagian ini, Anda diminta untuk memasukkan jawaban yang benar dari soal yang Anda buat. Pastikan jawaban
            yang dimasukkan sesuai dengan perhitungan yang benar dari soal yang diberikan.
          </li>
        </ul>

        <ul className="flex flex-col gap-1">
          <li className="font-bold uppercase text-primary md:text-lg">Inputan Skor</li>
          <li className="font-normal">
            Skor harus diisi dengan nilai antara 50 sampai 500. Pastikan nilai yang Anda masukkan berada dalam rentang
            tersebut agar diterima oleh sistem.
          </li>
        </ul>
        <li>
          Dengan mengikuti panduan ini, Anda akan dapat mengisi formulir soal dengan benar dan sistem dapat memproses
          inputan Anda dengan baik. Terima kasih!
        </li>
      </ul>
    </div>
  )
}
