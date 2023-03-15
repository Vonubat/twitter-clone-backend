import { ApiProperty } from '@nestjs/swagger';

export class FollowingDto {
  @ApiProperty({ example: 'uid randomly generated', description: 'uid randomly generated' })
  readonly targetUserId: string;
}
