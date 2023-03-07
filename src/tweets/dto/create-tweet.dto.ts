import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateTweetDto {
  @ApiProperty({ example: 'This is my awesome tweet', description: 'Content of tweet' })
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  readonly text: string;
}
