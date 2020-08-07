import {
  IsString,
  IsEmail,
  MinLength,
  MaxLength,
  IsOptional,
  IsNotEmpty,
  IsDefined,
} from 'class-validator';

export class UserDto {
  @IsDefined()
  @IsNotEmpty()
  @IsEmail({}, { message: 'Invalid email' })
  email: string;

  @IsDefined()
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @MaxLength(20)
  password: string;
}

export class CreateUserDto extends UserDto {
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  @MaxLength(20)
  firstName?: string;

  @IsDefined()
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  @MaxLength(20)
  lastName?: string;
}

export class UpdateUserDto extends CreateUserDto {
  @IsOptional()
  firstName?: string;

  @IsOptional()
  lastName?: string;
}

export class LoginUserDto extends UserDto {}
