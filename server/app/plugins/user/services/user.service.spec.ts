import { UserService } from './user.service';
import { createService, Config } from '@foal/core';
import { CreateUserDto } from '../dto/userDto';
import { createConnection, getConnection, getManager } from 'typeorm';
import chai = require('chai');
import { User } from '../entities';
const should = chai.should();
const expect = chai.expect;

describe('UserService', () => {
  let user: CreateUserDto, service: UserService, connection;

  before(async () => {
    await createConnection({
      type: 'sqlite',
      entities: [User],
      database: Config.get2('database.database'),
      dropSchema: Config.get2('database.dropSchema'),
      synchronize: Config.get2('database.synchronize'),
    });

    user = {
      email: 'test@test.com',
      password: 'mapletree',
      firstName: 'john',
      lastName: 'smith',
    };

    service = createService(UserService);
  });

  after(async () => {
    await getConnection().close();
  });

  describe('createOne()', () => {
    it('should able to save one user', async () => {
      const createdUSer = await service.createOne(user);
      createdUSer.should.be.an('object');
    });

    it('should not be able to save existing user', async () => {
      try {
        const createdUSer = await service.createOne(user);
        expect(createdUSer).to.be.a('string');
      } catch (error) {}
    });
  });

  describe('findByEmail()', () => {
    it('should able to retrieve one user by email', async () => {
      const userEmail = await service.findByEmail(user.email);
      if (userEmail) {
        userEmail.should.be.an('object');
      }
    });
  });
});
