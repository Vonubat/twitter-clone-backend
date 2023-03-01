import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID, MinLength } from 'class-validator';

export class CreateTweetDto {
  @ApiProperty({
    example: '91b61579-914b-4af5-a554-924d97622bdf',
    description: 'Unique userId (uuid) of User who created tweet',
  })
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  readonly userId: string;

  @ApiProperty({ example: 'This is my awesome tweet', description: 'Content of tweet' })
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  readonly text: string;
}
