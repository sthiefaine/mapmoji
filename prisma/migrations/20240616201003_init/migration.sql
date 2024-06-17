/*
  Warnings:

  - You are about to drop the column `key` on the `Weather` table. All the data in the column will be lost.
  - You are about to drop the column `key` on the `WeatherForDay` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Weather" DROP COLUMN "key";

-- AlterTable
ALTER TABLE "WeatherForDay" DROP COLUMN "key";
