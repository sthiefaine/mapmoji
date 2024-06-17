/*
  Warnings:

  - Changed the type of `time` on the `WeatherForDay` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "WeatherForDay" DROP COLUMN "time",
ADD COLUMN     "time" TIMESTAMP(3) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "WeatherForDay_country_time_key" ON "WeatherForDay"("country", "time");
