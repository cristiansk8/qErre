/*
  Warnings:

  - A unique constraint covering the columns `[correo]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Made the column `correo` on table `user` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `user` MODIFY `correo` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `User_correo_key` ON `User`(`correo`);
