import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Like } from 'src/db/entities/like.entity';
import { AddRemoveLikeDto } from './dto/add-remove-like.dto';
import { LikesService } from './likes.service';

@ApiTags('Likes')
@Controller('likes')
export class LikesController {
  constructor(private likesService: LikesService) {}

  @ApiOperation({ summary: 'Add/Remove Like to/from Tweet' })
  @ApiResponse({
    status: 201,
    description: 'Return updated array of Like of provided Tweet',
    type: [Like],
  })
  @Post()
  create(@Body() dto: AddRemoveLikeDto): Promise<Like[]> {
    return this.likesService.addRemoveLike(dto);
  }
}
