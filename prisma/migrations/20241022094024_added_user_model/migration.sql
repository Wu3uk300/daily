-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "plan" BOOLEAN NOT NULL,
    "progressM" INTEGER NOT NULL,
    "progressP" INTEGER NOT NULL,
    "archieveM" INTEGER[],
    "archieveP" INTEGER[],

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);
