import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class AddRemoveLikeDto {
  @ApiProperty({
    example: '91b61579-914b-4af5-a554-924d97622bdf',
    description: 'Unique userId (uuid)',
  })
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  readonly userId: string;

  @ApiProperty({
    example: '112de828-f6ff-49c9-89f9-e7e028aba053',
    description: 'Unique tweetId (uuid)',
  })
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  readonly tweetId: string;
}
