-- CreateTable
CREATE TABLE "Weather" (
    "id" SERIAL NOT NULL,
    "country" TEXT NOT NULL,
    "time" TIMESTAMP(3) NOT NULL,
    "key" TEXT NOT NULL,
    "object" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Weather_pkey" PRIMARY KEY ("id")
);
