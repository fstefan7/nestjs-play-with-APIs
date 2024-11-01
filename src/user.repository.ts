import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { User, Prisma } from '@prisma/client';
import { UserDto } from './user.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class UserRepository {
  constructor(private prisma: PrismaService) {}

  getUser(id: number): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  createUser(user: Prisma.UserCreateInput): Promise<User> {
    return this.prisma.user.create({
      data: user,
    });
  }

  async createUsers(users: UserDto[]): Promise<UserDto[]> {
    const returnedUsers = await this.prisma.user.createManyAndReturn({
      data: users,
    });

    return returnedUsers.map((user) => plainToInstance(UserDto, user));
  }
}
