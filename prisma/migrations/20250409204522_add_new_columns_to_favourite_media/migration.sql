/*
  Warnings:

  - Added the required column `voteAverage` to the `FavouriteMedia` table without a default value. This is not possible if the table is not empty.
  - Added the required column `year` to the `FavouriteMedia` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "FavouriteMedia" ADD COLUMN     "voteAverage" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "year" INTEGER NOT NULL;
