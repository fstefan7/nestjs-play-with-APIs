import { Exclude } from 'class-transformer';
import { IsNotEmpty, IsString, MinLength, Matches } from 'class-validator';

export class UserDTO {
  name: string;
  email: string;
  birthday: string;

  constructor(user: { name: string; email: string; birthday: string }) {
    this.name = user.name;
    this.email = user.email;
    this.birthday = user.birthday;
  }
}

export class UserDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  name: string;

  @IsNotEmpty()
  @IsString()
  @Matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,3}$/g)
  email: string;

  @IsNotEmpty()
  @IsString()
  @IsNotEmpty()
  birthday: string;

  @IsNotEmpty()
  @IsString()
  @IsNotEmpty()
  @Exclude()
  password: string;

  constructor(partial: Partial<UserDto>) {
    Object.assign(this, partial);
  }
}
