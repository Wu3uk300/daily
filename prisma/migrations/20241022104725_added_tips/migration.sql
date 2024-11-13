/*
  Warnings:

  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
DROP COLUMN "id";

-- CreateTable
CREATE TABLE "Mental" (
    "id" SERIAL NOT NULL,
    "advice" TEXT NOT NULL,

    CONSTRAINT "Mental_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Physical" (
    "id" SERIAL NOT NULL,
    "advice" TEXT NOT NULL,

    CONSTRAINT "Physical_pkey" PRIMARY KEY ("id")
);
