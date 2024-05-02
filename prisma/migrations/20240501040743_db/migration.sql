/*
  Warnings:

  - Added the required column `oldPrice` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `vote` to the `Course` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Course" ADD COLUMN     "oldPrice" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "vote" DOUBLE PRECISION NOT NULL;
