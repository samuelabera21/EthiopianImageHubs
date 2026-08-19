import { prisma } from './src/prisma/client';

async function main() {
  const email = process.argv[2] || 'samuelabera.dev@gmail.com';
  const roleName = (process.argv[3] || 'MODERATOR').toUpperCase();

  const role = await prisma.role.findUnique({ where: { name: roleName } });
  if (!role) {
    console.log(`Role ${roleName} not found! Available roles: USER, CONTRIBUTOR, MODERATOR, ADMIN`);
    return;
  }

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    console.log(`User with email "${email}" not found in database! Please register the account first.`);
    return;
  }

  const updatedUser = await prisma.user.update({
    where: { email },
    data: { roleId: role.id }
  });

  console.log(`Successfully updated ${user.username} (${email}) to role: ${roleName}`);
}

main()
  .catch((e) => console.error("Error updating user role:", e))
  .finally(() => prisma.$disconnect());
