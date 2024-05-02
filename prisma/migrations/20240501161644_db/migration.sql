/*
  Warnings:

  - Made the column `bestSeller` on table `Course` required. This step will fail if there are existing NULL values in that column.
  - Made the column `image` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Course" ALTER COLUMN "bestSeller" SET NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "image" SET NOT NULL;
