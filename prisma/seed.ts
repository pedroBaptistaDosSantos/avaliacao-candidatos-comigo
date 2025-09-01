import { PrismaClient, Role } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Iniciando seed do banco de dados...');

  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@comigotech.com' },
    update: {},
    create: {
      email: 'admin@comigotech.com',
      name: 'Administrador',
      password: await bcrypt.hash('admin123', 10),
      role: Role.ADMIN
    }
  });

  const attendantUser = await prisma.user.upsert({
    where: { email: 'atendente@comigotech.com' },
    update: {},
    create: {
      email: 'atendente@comigotech.com',
      name: 'Atendente',
      password: await bcrypt.hash('atendente123', 10),
      role: Role.ATTENDANT
    }
  });

  console.log(' Usuários criados com sucesso!');
  console.log(' Admin:', adminUser.email, '- Senha: admin123');
  console.log(' Atendente:', attendantUser.email, '- Senha: atendente123');
}

main()
  .catch((e) => {
    console.error(' Erro no seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });