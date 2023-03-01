import { Entity, PrimaryGeneratedColumn, BaseEntity, ManyToOne } from 'typeorm';
import { Tweet } from './tweet.entity';
import { User } from './user.entity';

@Entity()
export class Like extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  likeId!: string;

  @ManyToOne(() => Tweet, (tweet: Tweet): Like[] | undefined => tweet.like)
  tweet!: Tweet;

  @ManyToOne(() => User, (user: User): Like[] | undefined => user.like)
  user!: User;
}
