import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { AppService } from './app.service';
import { UserDto, UserDTO } from './user.dto';
import { User } from '@prisma/client';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('user/:id')
  getUser(@Param('id', ParseIntPipe) id: string): Promise<User> {
    return this.appService.getUser(+id);
  }

  @Get('users')
  getUsers(): Promise<UserDTO[]> {
    return this.appService.fetchAndInsertUsers();
  }

  @Get('users2')
  getUsers2(): Promise<UserDto[]> {
    return this.appService.fetchAndInsertManyUsers();
  }
}
