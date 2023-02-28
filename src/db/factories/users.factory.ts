import { Faker } from '@faker-js/faker';
import { setSeederFactory } from 'typeorm-extension';
import { User } from '../entities/user.entity';

export const UsersFactory = setSeederFactory(User, (faker: Faker): User => {
  const user = new User();
  user.username = faker.internet.userName();
  user.password = 'test';
  user.firstName = faker.name.firstName();
  user.lastName = faker.name.lastName();
  user.location = `${faker.address.cityName()}, ${faker.address.country()}`;
  user.avatar = faker.image.avatar();
  user.bgImage = faker.image.abstract(1920, 1080);

  return user;
});
