-- AlterTable
ALTER TABLE `session` ADD COLUMN `usersId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Session` ADD CONSTRAINT `Session_usersId_fkey` FOREIGN KEY (`usersId`) REFERENCES `Users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
