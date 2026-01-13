import { IsString, IsNotEmpty, MinLength, MaxLength } from 'class-validator';

export class CreateUserDTO {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  email: string

  @IsNotEmpty()
  @IsString()
  @MinLength(11)
  @MaxLength(15)
  phoneNumber: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  password: string;
}
