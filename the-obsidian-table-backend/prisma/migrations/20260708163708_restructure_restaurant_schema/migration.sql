/*
  Warnings:

  - You are about to drop the column `atmosphereScore` on the `Restaurant` table. All the data in the column will be lost.
  - You are about to drop the column `hours` on the `Restaurant` table. All the data in the column will be lost.
  - You are about to drop the column `hoursDetail` on the `Restaurant` table. All the data in the column will be lost.
  - You are about to drop the column `priceScore` on the `Restaurant` table. All the data in the column will be lost.
  - You are about to drop the column `qualityScore` on the `Restaurant` table. All the data in the column will be lost.
  - You are about to drop the column `reviewAtmosphereText` on the `Restaurant` table. All the data in the column will be lost.
  - You are about to drop the column `reviewAtmosphereTitle` on the `Restaurant` table. All the data in the column will be lost.
  - You are about to drop the column `reviewQualityText` on the `Restaurant` table. All the data in the column will be lost.
  - You are about to drop the column `reviewQualityTitle` on the `Restaurant` table. All the data in the column will be lost.
  - You are about to drop the column `reviewServiceTitle` on the `Restaurant` table. All the data in the column will be lost.
  - You are about to drop the column `score` on the `Restaurant` table. All the data in the column will be lost.
  - You are about to drop the column `serviceScore` on the `Restaurant` table. All the data in the column will be lost.
  - You are about to drop the column `tagline` on the `Restaurant` table. All the data in the column will be lost.
  - Added the required column `country` to the `Restaurant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `Restaurant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `googleMapsUrl` to the `Restaurant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `reviewAtmoText` to the `Restaurant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `reviewFoodText` to the `Restaurant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `scoreAtmo` to the `Restaurant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `scoreFood` to the `Restaurant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `scorePrice` to the `Restaurant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `scoreService` to the `Restaurant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalScore` to the `Restaurant` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `priceLevel` on the `Restaurant` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Restaurant" DROP COLUMN "atmosphereScore",
DROP COLUMN "hours",
DROP COLUMN "hoursDetail",
DROP COLUMN "priceScore",
DROP COLUMN "qualityScore",
DROP COLUMN "reviewAtmosphereText",
DROP COLUMN "reviewAtmosphereTitle",
DROP COLUMN "reviewQualityText",
DROP COLUMN "reviewQualityTitle",
DROP COLUMN "reviewServiceTitle",
DROP COLUMN "score",
DROP COLUMN "serviceScore",
DROP COLUMN "tagline",
ADD COLUMN     "country" TEXT NOT NULL,
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "googleMapsUrl" TEXT NOT NULL,
ADD COLUMN     "reviewAtmoText" TEXT NOT NULL,
ADD COLUMN     "reviewFoodText" TEXT NOT NULL,
ADD COLUMN     "scoreAtmo" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "scoreFood" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "scorePrice" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "scoreService" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "totalScore" DOUBLE PRECISION NOT NULL,
DROP COLUMN "priceLevel",
ADD COLUMN     "priceLevel" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Tag" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_RestaurantToTag" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_RestaurantToTag_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "Tag_name_key" ON "Tag"("name");

-- CreateIndex
CREATE INDEX "_RestaurantToTag_B_index" ON "_RestaurantToTag"("B");

-- AddForeignKey
ALTER TABLE "_RestaurantToTag" ADD CONSTRAINT "_RestaurantToTag_A_fkey" FOREIGN KEY ("A") REFERENCES "Restaurant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RestaurantToTag" ADD CONSTRAINT "_RestaurantToTag_B_fkey" FOREIGN KEY ("B") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;
