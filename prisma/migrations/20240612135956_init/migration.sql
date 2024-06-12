/*
  Warnings:

  - A unique constraint covering the columns `[country]` on the table `Weather` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Weather_country_key" ON "Weather"("country");
