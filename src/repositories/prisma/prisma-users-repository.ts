import { prisma } from 'src/lib/prisma';
import { Prisma } from '@prisma/client';
import type { UsersRepository } from '../users-repository';

// Métodos que receberam as operações no banco de dados
export class PrismaUsersRepository implements UsersRepository {
  async create(data: Prisma.UserCreateInput) {
    // Cria o usuário através dos parâmetros recebidos
    const user = await prisma.user.create({
      data,
    });

    return user;
  }

  async findByEmail(email: string) {
    // Verificando se o usuário a cadastrar já possui e-mail na base
    const sameEmail = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    return sameEmail;
  }

  async findById(userId: string) {
    // Verificando se o usuário a cadastrar já possui e-mail na base
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    return user;
  }
}
