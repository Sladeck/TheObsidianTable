import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const restaurants = [
  {
    slug: "lumiere-brasserie",
    name: "Lumière Brasserie",
    type: "Parisian Brasserie",
    score: 8.3,
    tagline:
      "A masterful reimagining of classic French technique, obscured in shadows and illuminated by brilliant execution.",
    images: [
      "https://picsum.photos/800/600?random=1",
      "https://picsum.photos/800/600?random=2",
      "https://picsum.photos/800/600?random=3",
    ],
    verdict:
      "Lumière Brasserie demands your attention, your wallet, and your surrender to its moody embrace. It is not merely a meal; it is a meticulously crafted sensory deprivation tank where only the flavors are allowed to scream.",
    qualityScore: 9.5,
    atmosphereScore: 8.0,
    priceScore: 7.0,
    serviceScore: 9.0,
    address: "12 Rue de la Roquette",
    city: "75011 Paris, France",
    priceLevel: "$$$$",
    priceNote: "Average $150/person",
    hours: "Dinner only",
    hoursDetail: "Tue - Sat, 6PM - 11PM",
    reviewQualityTitle: "Quality: The Culinary Execution",
    reviewQualityText:
      "The kitchen at Lumière operates with a precision that borders on the surgical. The Steak au Poivre is a testament to this, arriving with a crust so perfectly carbonized it shatters under the knife, revealing a medium-rare interior that weeps jus onto the plate. The peppercorn sauce is an exercise in restraint, pungent but never overpowering, binding the dish together with an unctuous richness.",
    reviewAtmosphereTitle: "Atmosphere: Engineered Intimacy",
    reviewAtmosphereText:
      "They have mastered the dark. The dining room is a study in chiaroscuro; pure blacks swallow the ambient noise, while solitary beams of warm light isolate each table like a stage set. It is intimate, yes, but almost aggressively so. You are forced to focus entirely on the food and your companion, isolated from the bustling city outside.",
    reviewServiceTitle: "Service & Value",
    reviewServiceText:
      "The waitstaff glide through the gloom like apparitions, appearing only precisely when needed. It is a choreographed silence that commands respect. As for the price, it is exorbitant. Yet, in a landscape littered with mediocrity, one pays for consistency, and Lumière delivers it unfailingly.",
  },
  {
    slug: "le-procope",
    name: "Le Procope",
    type: "French",
    score: 7.2,
    tagline: "Paris's oldest café, still serving old-world charm with a modern kitchen.",
    images: [
      "https://picsum.photos/800/600?random=4",
      "https://picsum.photos/800/600?random=5",
    ],
    verdict:
      "A love letter to tradition that occasionally trips over its own history, but never loses its footing for long.",
    qualityScore: 7.8,
    atmosphereScore: 8.5,
    priceScore: 6.5,
    serviceScore: 7.5,
    address: "13 Rue de l'Ancienne Comédie",
    city: "75006 Paris, France",
    priceLevel: "$$$",
    priceNote: "Average $80/person",
    hours: "Lunch & Dinner",
    hoursDetail: "Daily, 12PM - 12AM",
    reviewQualityTitle: "Quality: A Steady Hand",
    reviewQualityText:
      "The menu leans on the classics, and the kitchen executes them with quiet confidence rather than flair.",
    reviewAtmosphereTitle: "Atmosphere: Living History",
    reviewAtmosphereText:
      "Portraits and worn velvet booths make no secret of the centuries this room has seen. It photographs better than it seats.",
    reviewServiceTitle: "Service & Value",
    reviewServiceText:
      "Warm without being fussy, and priced fairly for the neighborhood, if not for the cuisine.",
  },
  {
    slug: "taverna-milieu",
    name: "Taverna Milieu",
    type: "Italian",
    score: 7.8,
    tagline: "Rustic Italian plates served without pretense in the heart of the city.",
    images: [
      "https://picsum.photos/800/600?random=6",
      "https://picsum.photos/800/600?random=7",
    ],
    verdict:
      "Unfussy, generous, and confident in its simplicity — the kind of place you return to rather than photograph.",
    qualityScore: 8.2,
    atmosphereScore: 7.5,
    priceScore: 8.0,
    serviceScore: 7.6,
    address: "44 Rue Oberkampf",
    city: "75011 Paris, France",
    priceLevel: "$$",
    priceNote: "Average $45/person",
    hours: "Dinner only",
    hoursDetail: "Wed - Mon, 7PM - 11PM",
    reviewQualityTitle: "Quality: Honest Cooking",
    reviewQualityText:
      "Handmade pasta and a wood-fired oven do most of the talking here, and they speak clearly.",
    reviewAtmosphereTitle: "Atmosphere: Neighborhood Trattoria",
    reviewAtmosphereText:
      "Communal tables and an open kitchen keep the room loud and lived-in, in the best way.",
    reviewServiceTitle: "Service & Value",
    reviewServiceText:
      "Friendly, brisk, and generous with portions relative to the bill.",
  },
];

async function main() {
  for (const restaurant of restaurants) {
    await prisma.restaurant.upsert({
      where: { slug: restaurant.slug },
      update: restaurant,
      create: restaurant,
    });
  }

  console.log(`Seeded ${restaurants.length} restaurants.`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
