import { Router } from "express";
import { prisma } from "../prisma.js";

const router = Router();

function toRestaurantDTO(restaurant) {
  return {
    slug: restaurant.slug,
    name: restaurant.name,
    type: restaurant.type,
    score: restaurant.score,
    tagline: restaurant.tagline,
    images: restaurant.images,
    verdict: restaurant.verdict,
    scores: {
      quality: restaurant.qualityScore,
      atmosphere: restaurant.atmosphereScore,
      price: restaurant.priceScore,
      service: restaurant.serviceScore,
    },
    logistics: {
      address: restaurant.address,
      city: restaurant.city,
      priceLevel: restaurant.priceLevel,
      priceNote: restaurant.priceNote,
      hours: restaurant.hours,
      hoursDetail: restaurant.hoursDetail,
    },
    review: {
      quality: {
        title: restaurant.reviewQualityTitle,
        text: restaurant.reviewQualityText,
      },
      atmosphere: {
        title: restaurant.reviewAtmosphereTitle,
        text: restaurant.reviewAtmosphereText,
      },
      service: {
        title: restaurant.reviewServiceTitle,
        text: restaurant.reviewServiceText,
      },
    },
  };
}

router.get("/", async (req, res) => {
  const restaurants = await prisma.restaurant.findMany({
    orderBy: { createdAt: "asc" },
  });

  res.json(restaurants.map(toRestaurantDTO));
});

router.get("/:slug", async (req, res) => {
  const restaurant = await prisma.restaurant.findUnique({
    where: { slug: req.params.slug },
  });

  if (!restaurant) {
    return res.status(404).json({ error: "Restaurant not found" });
  }

  res.json(toRestaurantDTO(restaurant));
});

export default router;
