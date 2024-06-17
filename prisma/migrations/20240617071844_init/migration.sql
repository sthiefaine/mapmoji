/*
  Warnings:

  - A unique constraint covering the columns `[country,time]` on the table `WeatherForDay` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "WeatherForDay_country_time_key" ON "WeatherForDay"("country", "time");
