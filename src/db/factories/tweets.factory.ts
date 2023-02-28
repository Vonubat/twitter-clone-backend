import { Faker } from '@faker-js/faker';
import { setSeederFactory } from 'typeorm-extension';
import { Tweet } from '../entities/tweet.entity';

export const TweetsFactory = setSeederFactory(Tweet, (faker: Faker): Tweet => {
  const tweet = new Tweet();
  tweet.text = faker.hacker.phrase();

  return tweet;
});
