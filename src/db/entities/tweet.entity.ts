import { Entity, Column, PrimaryGeneratedColumn, OneToMany, BaseEntity, ManyToOne, CreateDateColumn } from 'typeorm';
import { Like } from './like.entity';
import { User } from './user.entity';

@Entity()
export class Tweet extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  tweetId!: string;

  @Column()
  text!: string;

  @CreateDateColumn()
  date!: Date;

  @ManyToOne(() => User, (user: User): Tweet[] | undefined => user.tweet)
  user!: User;

  @OneToMany(() => Like, (like: Like): Tweet => like.tweet)
  like?: Like[];
}
