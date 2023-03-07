import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class UpdateAvatarDto {
  @ApiProperty({
    example: 'https://i.pinimg.com/236x/63/dd/c2/63ddc24b5f730d8fe4134708fbcc93df.jpg',
    description: 'URL of avatar',
  })
  @IsNotEmpty()
  @IsString()
  @IsUrl({ require_protocol: true, require_valid_protocol: true }, { message: 'Non-valid URL-address' })
  readonly avatar: string;
}
