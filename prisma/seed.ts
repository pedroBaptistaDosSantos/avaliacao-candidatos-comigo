import { PrismaClient, Role } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // Criar usuário padrão se não existir
  const defaultUser = await prisma.user.upsert({
    where: { email: 'admin@comigotech.com' },
    update: {},
    create: {
      email: 'admin@comigotech.com',
      name: 'Administrador',
      password: await bcrypt.hash('admin123', 10),
      role: Role.ADMIN
    }
  });

  console.log('Usuário padrão criado:', defaultUser);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });