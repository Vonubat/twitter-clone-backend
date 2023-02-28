import { Entity, Column, PrimaryGeneratedColumn, OneToMany, BaseEntity, CreateDateColumn } from 'typeorm';
import { Like } from './like.entity';
import { Tweet } from './tweet.entity';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  userId!: string;

  @Column({ unique: true })
  username!: string;

  @Column({ select: false })
  password!: string;

  @Column()
  firstName!: string;

  @Column()
  lastName!: string;

  @Column()
  location!: string;

  @Column({ nullable: true })
  avatar!: string;

  @Column({ nullable: true })
  bgImage!: string;

  @CreateDateColumn({ type: 'timestamptz' })
  joined!: Date;

  @OneToMany(() => Tweet, (tweet: Tweet): User => tweet.user)
  tweet?: Tweet[];

  @OneToMany(() => Like, (like: Like): User => like.user)
  like?: Like[];
}
