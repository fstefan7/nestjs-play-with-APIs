-- CreateTable
CREATE TABLE "Test" (
    "id" SERIAL NOT NULL,
    "val" TEXT,

    CONSTRAINT "Test_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "password" TEXT,
    "birthday" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);
