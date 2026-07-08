-- CreateTable
CREATE TABLE "Restaurant" (
    "id" SERIAL NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "tagline" TEXT NOT NULL,
    "score" DOUBLE PRECISION NOT NULL,
    "verdict" TEXT NOT NULL,
    "images" TEXT[],
    "qualityScore" DOUBLE PRECISION NOT NULL,
    "atmosphereScore" DOUBLE PRECISION NOT NULL,
    "priceScore" DOUBLE PRECISION NOT NULL,
    "serviceScore" DOUBLE PRECISION NOT NULL,
    "address" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "priceLevel" TEXT NOT NULL,
    "priceNote" TEXT NOT NULL,
    "hours" TEXT NOT NULL,
    "hoursDetail" TEXT NOT NULL,
    "reviewQualityTitle" TEXT NOT NULL,
    "reviewQualityText" TEXT NOT NULL,
    "reviewAtmosphereTitle" TEXT NOT NULL,
    "reviewAtmosphereText" TEXT NOT NULL,
    "reviewServiceTitle" TEXT NOT NULL,
    "reviewServiceText" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Restaurant_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Restaurant_slug_key" ON "Restaurant"("slug");
