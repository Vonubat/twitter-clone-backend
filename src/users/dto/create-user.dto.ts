import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'cool_guy_1984', description: 'Nickname. Should be unique' })
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  readonly username: string;

  @ApiProperty({ example: 'sUpEr_mEgA_SECRET_PASSWORD123', description: 'Password' })
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  readonly password: string;

  @ApiProperty({ example: 'Harry', description: 'User firstName' })
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  readonly firstName: string;

  @ApiProperty({ example: 'Potter', description: 'User lastName' })
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  readonly lastName: string;

  @ApiProperty({ example: 'Washington, D.C., USA', description: 'User location' })
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  readonly location: string;
}
