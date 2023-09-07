/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `Todo` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Todo_id_key` ON `Todo`(`id`);
