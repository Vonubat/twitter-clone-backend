import { PickType } from '@nestjs/swagger';
import { AddRemoveLikeDto } from '../dto/add-remove-like.dto';

export class GetLikeParams extends PickType(AddRemoveLikeDto, ['tweetId'] as const) {}
