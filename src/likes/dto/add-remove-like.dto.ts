import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class AddRemoveLikeDto {
  @ApiProperty({
    example: '112de828-f6ff-49c9-89f9-e7e028aba053',
    description: 'Unique tweetId (uuid)',
  })
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  readonly tweetId: string;
}
