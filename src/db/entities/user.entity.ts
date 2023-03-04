import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, BaseEntity, CreateDateColumn } from 'typeorm';
import { Like } from './like.entity';
import { Tweet } from './tweet.entity';

@Entity()
export class User extends BaseEntity {
  @ApiProperty({ example: '91b61579-914b-4af5-a554-924d97622bdf', description: 'Unique userId (uuid)' })
  @PrimaryGeneratedColumn('uuid')
  userId!: string;

  @ApiProperty({ example: 'skromez', description: 'Unique username' })
  @Column({ unique: true })
  username!: string;

  @Column()
  @Exclude()
  password!: string;

  @ApiProperty({ example: 'Dmitrii', description: 'User firstName' })
  @Column()
  firstName!: string;

  @ApiProperty({ example: 'Novikov', description: 'User lastName' })
  @Column()
  lastName!: string;

  @ApiProperty({ example: 'Warsaw, Poland', description: 'User location' })
  @Column()
  location!: string;

  @ApiProperty({
    example: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/846.jpg',
    description: 'User avatar image',
    nullable: true,
  })
  @Column({ nullable: true })
  avatar!: string;

  @ApiProperty({
    example: 'https://loremflickr.com/cache/resized/65535_52095739958_941655c8e9_h_1280_720_nofilter.jpg',
    description: 'User profile background image',
    nullable: true,
  })
  @Column({ nullable: true })
  bgImage!: string;

  @ApiProperty({
    example: '2023-02-28T18:41:52.748Z',
    description:
      'User registartion date/time (a string representing the given date in the ISO 8601 format according to universal time)',
  })
  @CreateDateColumn({ type: 'timestamptz' })
  joined!: Date;

  @OneToMany(() => Tweet, (tweet: Tweet): User => tweet.user)
  tweets?: Tweet[];

  @OneToMany(() => Like, (like: Like): User => like.user)
  likes?: Like[];
}
