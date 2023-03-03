import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, BaseEntity, ManyToOne, CreateDateColumn } from 'typeorm';
import { Like } from './like.entity';
import { User } from './user.entity';

@Entity()
export class Tweet extends BaseEntity {
  @ApiProperty({ example: '91b61579-914b-4af5-a554-924d97622bdf', description: 'Unique tweetId (uuid)' })
  @PrimaryGeneratedColumn('uuid')
  tweetId!: string;

  @ApiProperty({ example: 'This is my awesome tweet', description: 'Content of tweet' })
  @Column()
  text!: string;

  @ApiProperty({
    example: '2023-02-28T18:41:52.748Z',
    description:
      'Tweet creation date/time (a string representing the given date in the ISO 8601 format according to universal time)',
  })
  @CreateDateColumn({ type: 'timestamptz' })
  date!: Date;

  @ManyToOne(() => User, (user: User): Tweet[] | undefined => user.tweets)
  user!: User;

  @OneToMany(() => Like, (like: Like): Tweet => like.tweet)
  likes?: Like[];
}
