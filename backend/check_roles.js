const { PrismaClient } = require('./src/generated/prisma');
const prisma = new PrismaClient();
prisma.role.findMany().then(roles => {
  console.log(roles);
  prisma.$disconnect();
});
