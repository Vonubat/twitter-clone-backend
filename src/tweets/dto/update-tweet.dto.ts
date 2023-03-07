import { PickType } from '@nestjs/swagger';
import { CreateTweetDto } from './create-tweet.dto';

export class UpdateTweetDto extends PickType(CreateTweetDto, ['text'] as const) {}
