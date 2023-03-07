import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';
import { Tweet } from '../entities/tweet.entity';
import { User } from '../entities/user.entity';
import * as json from '../db.json';

export class MainSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<void> {
    const usersRepository = dataSource.getRepository(User);
    const tweetsRepository = dataSource.getRepository(Tweet);

    for (const jsonUser of json) {
      await usersRepository.insert([
        {
          username: jsonUser.username,
          password: jsonUser.username,
          firstName: jsonUser.firstName,
          lastName: jsonUser.lastName,
          location: jsonUser.location,
        },
      ]);

      await tweetsRepository.insert([
        {
          text: jsonUser.tweets[0].text,
          user: (await usersRepository.findOne({ where: { username: jsonUser.username } })) as User,
        },
      ]);
    }
  }
}
