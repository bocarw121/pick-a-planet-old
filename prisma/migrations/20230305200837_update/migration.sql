/*
  Warnings:

  - You are about to drop the column `usersId` on the `session` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `session` DROP FOREIGN KEY `Session_usersId_fkey`;

-- AlterTable
ALTER TABLE `session` DROP COLUMN `usersId`;
