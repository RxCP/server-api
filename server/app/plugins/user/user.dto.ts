import {
  IsString,
  validateOrReject,
  Contains,
  IsInt,
  Length,
  IsEmail,
  IsFQDN,
  IsDate,
  Min,
  Max,
  MinLength,
  MaxLength,
  IsEmpty,
} from 'class-validator';

export class UserDto {
  @IsEmail({}, { message: 'Invalid email' })
  email: string;

  @IsString()
  @MinLength(6)
  @MaxLength(20)
  password: string;
}

export class CreateUserDto extends UserDto {
  @IsString()
  @MinLength(1)
  @MaxLength(20)
  firstName: string;

  @MinLength(1)
  @MaxLength(20)
  lastName: string;
}

export class LoginUserDto extends UserDto {}
