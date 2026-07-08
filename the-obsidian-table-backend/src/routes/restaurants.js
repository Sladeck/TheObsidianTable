import { Router } from "express";
import { prisma } from "../prisma.js";

const router = Router();

function toRestaurantDTO(restaurant) {
  return {
    slug: restaurant.slug,
    name: restaurant.name,
    type: restaurant.type,
    description: restaurant.description,
    totalScore: restaurant.totalScore,
    images: restaurant.images,
    verdict: restaurant.verdict,
    scores: {
      food: restaurant.scoreFood,
      atmo: restaurant.scoreAtmo,
      price: restaurant.scorePrice,
      service: restaurant.scoreService,
    },
    location: {
      address: restaurant.address,
      city: restaurant.city,
      country: restaurant.country,
      googleMapsUrl: restaurant.googleMapsUrl,
    },
    priceLevel: restaurant.priceLevel,
    priceNote: restaurant.priceNote,
    tags: restaurant.tags.map((tag) => tag.name),
    review: {
      food: restaurant.reviewFoodText,
      atmo: restaurant.reviewAtmoText,
      service: restaurant.reviewServiceText,
    },
  };
}

router.get("/", async (req, res) => {
  const sort = req.query.sort === "latest" ? "desc" : "asc";
  const take = req.query.take ? Number(req.query.take) : undefined;

  const restaurants = await prisma.restaurant.findMany({
    include: { tags: true },
    orderBy: { createdAt: sort },
    take,
  });

  res.json(restaurants.map(toRestaurantDTO));
});

router.get("/:slug", async (req, res) => {
  const restaurant = await prisma.restaurant.findUnique({
    where: { slug: req.params.slug },
    include: { tags: true },
  });

  if (!restaurant) {
    return res.status(404).json({ error: "Restaurant not found" });
  }

  res.json(toRestaurantDTO(restaurant));
});

export default router;
