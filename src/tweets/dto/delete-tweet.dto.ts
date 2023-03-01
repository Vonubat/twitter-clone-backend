import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class DeleteTweetDto {
  @ApiProperty({
    example: '91b61579-914b-4af5-a554-924d97622bdf',
    description: 'Unique tweetId (uuid)',
  })
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  readonly tweetId: string;
}
