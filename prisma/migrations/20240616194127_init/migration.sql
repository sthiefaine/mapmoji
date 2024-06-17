-- CreateTable
CREATE TABLE "WeatherForDay" (
    "id" SERIAL NOT NULL,
    "country" TEXT NOT NULL,
    "time" TIMESTAMP(3) NOT NULL,
    "key" TEXT NOT NULL,
    "object" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "WeatherForDay_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "WeatherForDay_country_key" ON "WeatherForDay"("country");
