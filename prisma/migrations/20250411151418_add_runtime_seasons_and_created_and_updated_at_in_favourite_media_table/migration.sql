/*
  Warnings:

  - Added the required column `mediaType` to the `FavouriteMedia` table without a default value. This is not possible if the table is not empty.
  - Added the required column `posterPath` to the `FavouriteMedia` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `FavouriteMedia` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "FavouriteMedia" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "mediaType" TEXT NOT NULL,
ADD COLUMN     "posterPath" TEXT NOT NULL,
ADD COLUMN     "runtime" TEXT,
ADD COLUMN     "seasons" INTEGER,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
