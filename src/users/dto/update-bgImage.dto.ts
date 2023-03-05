import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class UpdateBgImageDto {
  @ApiProperty({
    example:
      'https://img.freepik.com/free-vector/hand-painted-watercolor-pastel-sky-background_23-2148902771.jpg?w=2000',
    description: 'URL of bgImage',
  })
  @IsNotEmpty()
  @IsString()
  @IsUrl({ require_protocol: true, require_valid_protocol: true }, { message: 'Non-valid URL-address' })
  readonly bgImage: string;
}
