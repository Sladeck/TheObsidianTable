import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const restaurants = [
  {
    slug: "lumiere-brasserie",
    name: "Lumière Brasserie",
    type: "Parisian Brasserie",
    description:
      "A masterful reimagining of classic French technique, obscured in shadows and illuminated by brilliant execution.",
    images: [
      "https://picsum.photos/800/600?random=1",
      "https://picsum.photos/800/600?random=2",
      "https://picsum.photos/800/600?random=3",
    ],
    verdict:
      "Lumière Brasserie demands your attention, your wallet, and your surrender to its moody embrace. It is not merely a meal; it is a meticulously crafted sensory deprivation tank where only the flavors are allowed to scream.",
    totalScore: 8.3,
    scoreFood: 9.5,
    scoreAtmo: 8.0,
    scorePrice: 7.0,
    scoreService: 9.0,
    address: "12 Rue de la Roquette",
    city: "Paris",
    country: "France",
    googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=12+Rue+de+la+Roquette+75011+Paris+France",
    priceLevel: 4,
    priceNote: "Average $150/person",
    reviewFoodText:
      "The kitchen at Lumière operates with a precision that borders on the surgical. The Steak au Poivre is a testament to this, arriving with a crust so perfectly carbonized it shatters under the knife, revealing a medium-rare interior that weeps jus onto the plate. The peppercorn sauce is an exercise in restraint, pungent but never overpowering, binding the dish together with an unctuous richness.",
    reviewAtmoText:
      "They have mastered the dark. The dining room is a study in chiaroscuro; pure blacks swallow the ambient noise, while solitary beams of warm light isolate each table like a stage set. It is intimate, yes, but almost aggressively so. You are forced to focus entirely on the food and your companion, isolated from the bustling city outside.",
    reviewServiceText:
      "The waitstaff glide through the gloom like apparitions, appearing only precisely when needed. It is a choreographed silence that commands respect. As for the price, it is exorbitant. Yet, in a landscape littered with mediocrity, one pays for consistency, and Lumière delivers it unfailingly.",
    tags: ["romantic", "date-night", "fine-dining"],
  },
  {
    slug: "le-procope",
    name: "Le Procope",
    type: "French",
    description: "Paris's oldest café, still serving old-world charm with a modern kitchen.",
    images: [
      "https://picsum.photos/800/600?random=4",
      "https://picsum.photos/800/600?random=5",
    ],
    verdict:
      "A love letter to tradition that occasionally trips over its own history, but never loses its footing for long.",
    totalScore: 7.2,
    scoreFood: 7.8,
    scoreAtmo: 8.5,
    scorePrice: 6.5,
    scoreService: 7.5,
    address: "13 Rue de l'Ancienne Comédie",
    city: "Paris",
    country: "France",
    googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=13+Rue+de+l%27Ancienne+Com%C3%A9die+75006+Paris+France",
    priceLevel: 3,
    priceNote: "Average $80/person",
    reviewFoodText:
      "The menu leans on the classics, and the kitchen executes them with quiet confidence rather than flair.",
    reviewAtmoText:
      "Portraits and worn velvet booths make no secret of the centuries this room has seen. It photographs better than it seats.",
    reviewServiceText: "Warm without being fussy, and priced fairly for the neighborhood, if not for the cuisine.",
    tags: ["historic", "classic"],
  },
  {
    slug: "taverna-milieu",
    name: "Taverna Milieu",
    type: "Italian",
    description: "Rustic Italian plates served without pretense in the heart of the city.",
    images: [
      "https://picsum.photos/800/600?random=6",
      "https://picsum.photos/800/600?random=7",
    ],
    verdict:
      "Unfussy, generous, and confident in its simplicity — the kind of place you return to rather than photograph.",
    totalScore: 7.8,
    scoreFood: 8.2,
    scoreAtmo: 7.5,
    scorePrice: 8.0,
    scoreService: 7.6,
    address: "44 Rue Oberkampf",
    city: "Paris",
    country: "France",
    googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=44+Rue+Oberkampf+75011+Paris+France",
    priceLevel: 2,
    priceNote: "Average $45/person",
    reviewFoodText: "Handmade pasta and a wood-fired oven do most of the talking here, and they speak clearly.",
    reviewAtmoText: "Communal tables and an open kitchen keep the room loud and lived-in, in the best way.",
    reviewServiceText: "Friendly, brisk, and generous with portions relative to the bill.",
    tags: ["casual", "date-night"],
  },
];

async function main() {
  for (const { tags, ...restaurant } of restaurants) {
    await prisma.restaurant.upsert({
      where: { slug: restaurant.slug },
      update: {
        ...restaurant,
        tags: {
          set: [],
          connectOrCreate: tags.map((name) => ({ where: { name }, create: { name } })),
        },
      },
      create: {
        ...restaurant,
        tags: {
          connectOrCreate: tags.map((name) => ({ where: { name }, create: { name } })),
        },
      },
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
