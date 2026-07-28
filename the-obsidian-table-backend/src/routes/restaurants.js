import { Router } from "express";
import { prisma } from "../prisma.js";
import { requireAuth } from "../middleware/auth.js";

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

const SLUG_PATTERN = /^[a-z0-9]+(-[a-z0-9]+)*$/;

function validateBody(body) {
  const errors = [];

  const requiredStrings = {
    name: body.name,
    slug: body.slug,
    type: body.type,
    description: body.description,
    verdict: body.verdict,
    priceNote: body.priceNote,
    "location.address": body.location?.address,
    "location.city": body.location?.city,
    "location.country": body.location?.country,
    "location.googleMapsUrl": body.location?.googleMapsUrl,
    "review.food": body.review?.food,
    "review.atmo": body.review?.atmo,
    "review.service": body.review?.service,
  };

  for (const [key, value] of Object.entries(requiredStrings)) {
    if (!value || typeof value !== "string" || !value.trim()) {
      errors.push(`${key} is required`);
    }
  }

  if (body.slug && !SLUG_PATTERN.test(body.slug)) {
    errors.push("slug must be lowercase letters, numbers, and hyphens only");
  }

  const scores = {
    totalScore: body.totalScore,
    "scores.food": body.scores?.food,
    "scores.atmo": body.scores?.atmo,
    "scores.price": body.scores?.price,
    "scores.service": body.scores?.service,
  };

  for (const [key, value] of Object.entries(scores)) {
    const num = Number(value);
    if (Number.isNaN(num) || num < 0 || num > 10) {
      errors.push(`${key} must be a number between 0 and 10`);
    }
  }

  const priceLevel = Number(body.priceLevel);
  if (!Number.isInteger(priceLevel) || priceLevel < 1 || priceLevel > 4) {
    errors.push("priceLevel must be an integer between 1 and 4");
  }

  if (!Array.isArray(body.images) || body.images.length === 0) {
    errors.push("At least one image is required");
  }

  if (body.tags && !Array.isArray(body.tags)) {
    errors.push("tags must be an array");
  }

  return errors;
}

function toPrismaData(body) {
  return {
    slug: body.slug.trim(),
    name: body.name.trim(),
    type: body.type.trim(),
    description: body.description.trim(),
    totalScore: Number(body.totalScore),
    images: body.images,
    verdict: body.verdict.trim(),
    scoreFood: Number(body.scores.food),
    scoreAtmo: Number(body.scores.atmo),
    scorePrice: Number(body.scores.price),
    scoreService: Number(body.scores.service),
    address: body.location.address.trim(),
    city: body.location.city.trim(),
    country: body.location.country.trim(),
    googleMapsUrl: body.location.googleMapsUrl.trim(),
    priceLevel: Number(body.priceLevel),
    priceNote: body.priceNote.trim(),
    reviewFoodText: body.review.food.trim(),
    reviewAtmoText: body.review.atmo.trim(),
    reviewServiceText: body.review.service.trim(),
  };
}

function buildTagsInput(tags) {
  const names = [...new Set((tags ?? []).map((tag) => String(tag).trim()).filter(Boolean))];
  return names.map((name) => ({ where: { name }, create: { name } }));
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

router.post("/", requireAuth, async (req, res) => {
  const body = req.body ?? {};
  const errors = validateBody(body);

  if (errors.length) {
    return res.status(400).json({ errors });
  }

  try {
    const restaurant = await prisma.restaurant.create({
      data: {
        ...toPrismaData(body),
        tags: { connectOrCreate: buildTagsInput(body.tags) },
      },
      include: { tags: true },
    });

    res.status(201).json(toRestaurantDTO(restaurant));
  } catch (error) {
    if (error.code === "P2002") {
      return res.status(409).json({ error: "A restaurant with this slug already exists" });
    }
    throw error;
  }
});

router.put("/:slug", requireAuth, async (req, res) => {
  const body = req.body ?? {};
  const errors = validateBody(body);

  if (errors.length) {
    return res.status(400).json({ errors });
  }

  try {
    const restaurant = await prisma.restaurant.update({
      where: { slug: req.params.slug },
      data: {
        ...toPrismaData(body),
        tags: { set: [], connectOrCreate: buildTagsInput(body.tags) },
      },
      include: { tags: true },
    });

    res.json(toRestaurantDTO(restaurant));
  } catch (error) {
    if (error.code === "P2025") {
      return res.status(404).json({ error: "Restaurant not found" });
    }
    if (error.code === "P2002") {
      return res.status(409).json({ error: "A restaurant with this slug already exists" });
    }
    throw error;
  }
});

router.delete("/:slug", requireAuth, async (req, res) => {
  try {
    await prisma.restaurant.delete({ where: { slug: req.params.slug } });
    res.status(204).end();
  } catch (error) {
    if (error.code === "P2025") {
      return res.status(404).json({ error: "Restaurant not found" });
    }
    throw error;
  }
});

export default router;
