import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

// initialize the Prisma Client
const prisma = new PrismaClient();

const roundsOfHashing = 10;

async function main() {
  const passwordHash = await bcrypt.hash('Admin@123', roundsOfHashing);

  const user1 = await prisma.user.upsert({
    where: { email: 'superadmin@example.com' },
    update: {
      password: passwordHash,
    },
    create: {
      email: 'superadmin@example.com',
      name: 'Super Admin',
      password: passwordHash,
    },
  });


  console.log({ user1 });
}

// execute the main function
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // close the Prisma Client at the end
    await prisma.$disconnect();
  });
