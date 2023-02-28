import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { Tweet } from '../entities/tweet.entity';
import { User } from '../entities/user.entity';

export class MainSeeder implements Seeder {
  public async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<void> {
    const userFactory = factoryManager.get(User);
    const users = await userFactory.saveMany(5);

    const tweetsFactory = factoryManager.get(Tweet);
    const tweetsRepository = dataSource.getRepository(Tweet);
    const tweets = await Promise.all(
      (
        await tweetsFactory.saveMany(25)
      ).map(async (tweet) => {
        tweet.user = users[Math.floor(Math.random() * users.length)];
        return tweet;
      }),
    );
    await tweetsRepository.save(tweets);
  }
}
