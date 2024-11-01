import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { RandomUser, RandomUserAPIResponse } from './randomUser.types';
import { UserDto, UserDTO } from './user.dto';
import { HttpService } from '@nestjs/axios';
import { validateOrReject } from 'class-validator';

@Injectable()
export class AppService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly httpService: HttpService,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  getUser(id: number) {
    return this.userRepository.getUser(id);
  }

  async fetchAndInsertUsers(): Promise<UserDTO[]> {
    try {
      const response =
        await this.httpService.axiosRef.get<RandomUserAPIResponse>(
          'https://randomuser.me/api/?results=5',
        );

      const users: RandomUser[] = response.data.results;

      const insertedUsers: UserDTO[] = [];
      for (const user of users) {
        const insertedUser = await this.userRepository.createUser({
          email: user.email,
          password: user.login.password,
          name: `${user.name.first} ${user.name.last}`,
          birthday: `${user.dob.date}`,
        });

        insertedUsers.push(
          new UserDTO({
            name: insertedUser.name,
            email: insertedUser.email,
            birthday: insertedUser.birthday,
          }),
        );
      }

      return insertedUsers;
    } catch (error) {
      console.log('Error fetching or inserting users', error);
      throw error;
    }
  }

  async fetchAndInsertManyUsers(): Promise<UserDto[]> {
    try {
      const response =
        await this.httpService.axiosRef.get<RandomUserAPIResponse>(
          'https://randomuser.me/api/?results=5',
        );

      const randomUsers: RandomUser[] = response.data.results;

      const usersToInsert: UserDto[] = [];
      for (const user of randomUsers) {
        const userDto = new UserDto({
          name: `${user.name.first} ${user.name.last}`,
          email: user.email,
          birthday: `${user.dob.date}`,
          password: user.login.password,
        });

        usersToInsert.push(userDto);

        await validateOrReject(userDto).catch(() => {
          throw new HttpException(
            {
              status: HttpStatus.NOT_ACCEPTABLE,
              error: 'Missing something',
            },
            HttpStatus.NOT_ACCEPTABLE,
          );
        });
      }

      const insertedUsers = await this.userRepository.createUsers(
        usersToInsert,
      );

      return insertedUsers;
    } catch (error) {
      console.log('Error fetching or inserting users', error);
      throw error;
    }
  }
}
