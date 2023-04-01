import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class FollowingUnFollowingDto {
  @ApiProperty({ example: 'uid randomly generated', description: 'uid randomly generated' })
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  readonly targetUserId: string;
}
