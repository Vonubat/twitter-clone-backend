import { ApiProperty } from '@nestjs/swagger';
import { Entity, PrimaryGeneratedColumn, BaseEntity, ManyToOne } from 'typeorm';
import { Tweet } from './tweet.entity';
import { User } from './user.entity';

@Entity()
export class Like extends BaseEntity {
  @ApiProperty({ example: '91b61579-914b-4af5-a554-924d97622bdf', description: 'Unique likeId (uuid)' })
  @PrimaryGeneratedColumn('uuid')
  likeId!: string;

  @ManyToOne(() => Tweet, (tweet: Tweet): Like[] | undefined => tweet.like)
  tweet!: Tweet;

  @ManyToOne(() => User, (user: User): Like[] | undefined => user.like)
  user!: User;
}
