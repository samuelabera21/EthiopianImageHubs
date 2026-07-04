import { prisma } from "./config/database";

async function main() {
  const role = await prisma.role.findUnique({
    where: {
      name: "USER",
    },
  });

  console.log(role);
}

main();