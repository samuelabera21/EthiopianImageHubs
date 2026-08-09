import { PrismaClient } from './src/generated/prisma';
const prisma = new PrismaClient();

async function main() {
  const modRole = await prisma.role.findUnique({ where: { name: 'MODERATOR' } });
  if (!modRole) {
    console.log("MODERATOR role not found!");
    return;
  }
  
  const updatedUser = await prisma.user.update({
    where: { email: 'samuelabera.dev@gmail.com' },
    data: { roleId: modRole.id }
  });
  
  console.log("User updated successfully to MODERATOR:");
  console.log(updatedUser);
}

main().finally(() => prisma.$disconnect());
