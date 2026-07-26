// import "dotenv/config";

// import { PrismaPg } from "@prisma/adapter-pg";
// import { PrismaClient } from "../generated/prisma/client";
// import { Pool } from "pg";

// const pool = new Pool({
//   connectionString: process.env.DATABASE_URL,
// });

// const adapter = new PrismaPg(pool);

// const prisma = new PrismaClient({
//   adapter,
// });

// async function main() {
//   console.log("🌱 Seeding database...\n");

//   const roles = [
//     {
//       name: "USER",
//       description: "Default registered user",
//     },
//     {
//       name: "CONTRIBUTOR",
//       description: "Can upload and manage own images",
//     },
//     {
//       name: "MODERATOR",
//       description: "Can review reported content",
//     },
//     {
//       name: "ADMIN",
//       description: "Full system administrator",
//     },
//   ];

//   for (const role of roles) {
//     await prisma.role.upsert({
//       where: {
//         name: role.name,
//       },
//       update: {
//         description: role.description,
//       },
//       create: role,
//     });
//   }

//   console.log("✅ Roles seeded successfully.");
// }

// main()
//   .then(async () => {
//     await prisma.$disconnect();
//     await pool.end();
//   })
//   .catch(async (error) => {
//     console.error(error);

//     await prisma.$disconnect();
//     await pool.end();

//     process.exit(1);
//   });

import "dotenv/config";

import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({
  adapter,
});

async function main() {
  console.log("🌱 Seeding database...\n");

  //--------------------------------------------------
  // Roles
  //--------------------------------------------------

  const roles = [
    {
      name: "USER",
      description: "Default registered user",
    },
    {
      name: "CONTRIBUTOR",
      description:
        "Can upload and manage own images",
    },
    {
      name: "MODERATOR",
      description:
        "Can review reported content",
    },
    {
      name: "ADMIN",
      description:
        "Full system administrator",
    },
  ];

  for (const role of roles) {
    await prisma.role.upsert({
      where: {
        name: role.name,
      },
      update: {
        description: role.description,
      },
      create: role,
    });
  }

  console.log("✅ Roles seeded");

  //--------------------------------------------------
  // Categories
  //--------------------------------------------------

  const categories = [
    {
      name: "Nature",
      slug: "nature",
      description:
        "Landscapes, forests, mountains and wildlife",
    },
    {
      name: "Wildlife",
      slug: "wildlife",
      description:
        "Animals and birds found in Ethiopia",
    },
    {
      name: "Culture",
      slug: "culture",
      description:
        "Traditions, festivals and cultural heritage",
    },
    {
      name: "People",
      slug: "people",
      description:
        "Portraits and daily life",
    },
    {
      name: "Architecture",
      slug: "architecture",
      description:
        "Historic and modern buildings",
    },
    {
      name: "Tourism",
      slug: "tourism",
      description:
        "Tourist destinations and attractions",
    },
    {
      name: "Coffee",
      slug: "coffee",
      description:
        "Coffee farms, ceremonies and culture",
    },
    {
      name: "Food",
      slug: "food",
      description:
        "Traditional Ethiopian foods",
    },
    {
      name: "Religious Heritage",
      slug: "religious-heritage",
      description:
        "Churches, mosques and religious sites",
    },
    {
      name: "Historical Places",
      slug: "historical-places",
      description:
        "Historic monuments and landmarks",
    },
  ];

  for (const category of categories) {
    await prisma.category.upsert({
      where: {
        slug: category.slug,
      },
      update: {
        name: category.name,
        description:
          category.description,
      },
      create: category,
    });
  }

  console.log("✅ Categories seeded");

  //--------------------------------------------------
  // Tags
  //--------------------------------------------------

  const tags = [
    "ethiopia",
    "addis-ababa",
    "lalibela",
    "gondar",
    "axum",
    "harar",
    "bale",
    "simien",
    "coffee",
    "culture",
    "festival",
    "landscape",
    "nature",
    "wildlife",
    "mountains",
    "lake",
    "church",
    "history",
    "traditional",
    "travel",
    "tourism",
    "people",
    "portrait",
    "sunrise",
    "sunset",
    "architecture",
    "food",
    "street",
    "market",
    "heritage",
  ];

  for (const name of tags) {
    await prisma.tag.upsert({
      where: {
        slug: name,
      },
      update: {
        name,
      },
      create: {
        name,
        slug: name,
      },
    });
  }

  console.log("✅ Tags seeded");

  console.log(
    "\n🎉 Database seeding completed successfully.",
  );
}

main()
  .then(async () => {
    await prisma.$disconnect();
    await pool.end();
  })
  .catch(async (error) => {
    console.error(error);

    await prisma.$disconnect();
    await pool.end();

    process.exit(1);
  });