import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  readonly username: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  readonly password: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  readonly firstName: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  readonly lastName: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  readonly location: string;
}
