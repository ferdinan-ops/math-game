/*
  Warnings:

  - You are about to drop the `permainan` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `soal` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `soal` DROP FOREIGN KEY `Soal_id_permainan_fkey`;

-- AlterTable
ALTER TABLE `guru` ADD COLUMN `is_email_verified` BOOLEAN NOT NULL DEFAULT false;

-- DropTable
DROP TABLE `permainan`;

-- DropTable
DROP TABLE `soal`;

-- CreateTable
CREATE TABLE `Materi` (
    `id` VARCHAR(191) NOT NULL,
    `nama_materi` VARCHAR(191) NOT NULL,
    `level` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SubMateri` (
    `id` VARCHAR(191) NOT NULL,
    `nama_sub_materi` VARCHAR(191) NOT NULL,
    `level` INTEGER NOT NULL,
    `mode_ujian` BOOLEAN NOT NULL DEFAULT false,
    `id_materi` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Nilai` (
    `id` VARCHAR(191) NOT NULL,
    `nilai` INTEGER NOT NULL,
    `id_siswa` VARCHAR(191) NOT NULL,
    `id_sub_materi` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `SubMateri` ADD CONSTRAINT `SubMateri_id_materi_fkey` FOREIGN KEY (`id_materi`) REFERENCES `Materi`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Nilai` ADD CONSTRAINT `Nilai_id_siswa_fkey` FOREIGN KEY (`id_siswa`) REFERENCES `Siswa`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Nilai` ADD CONSTRAINT `Nilai_id_sub_materi_fkey` FOREIGN KEY (`id_sub_materi`) REFERENCES `SubMateri`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
