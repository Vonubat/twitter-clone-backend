import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { Tweet } from '../entities/tweet.entity';
import { User } from '../entities/user.entity';

export class MainSeeder implements Seeder {
  public async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<void> {
    const tweetsRepository = dataSource.getRepository(Tweet);

    const userFactory = factoryManager.get(User);
    const tweetsFactory = factoryManager.get(Tweet);

    const users = await userFactory.saveMany(5);
    const tweets = await tweetsFactory.saveMany(5);

    await tweetsRepository.save(tweets);
  }
}
