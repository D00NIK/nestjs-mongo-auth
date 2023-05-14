import { IsEmail, Length, IsStrongPassword, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @Length(5, 20)
  username: string;

  @IsNotEmpty()
  @IsStrongPassword()
  password: string;
}
