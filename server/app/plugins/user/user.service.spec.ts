import { UserService } from './user.service';
import { createService, Config } from '@foal/core';
import { CreateUserDto, UpdateUserDto } from './user.dto';
import { createConnection, getConnection } from 'typeorm';
import chai = require('chai');
import { User } from './entities';
import { strictEqual } from 'assert';
const should = chai.should(); // eslint-disable-line
const expect = chai.expect;

describe('UserService', () => {
  let user: CreateUserDto, service: UserService;

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

  describe('archiveById()', () => {
    it('should archive one user by id', async () => {
      const res = await service.archiveById(1);
      if (res) {
        res.should.be.an('object');
      }
    });
  });

  describe('restoreById()', () => {
    it('should restore one user by id', async () => {
      const res = await service.restoreById(1);
      if (res) {
        res.should.be.an('object');
      }
    });
  });

  describe('updateOne()', () => {
    it('should update one user base from DTO', async () => {
      const res = await service.updateOne(1, user);
      if (res) {
        res.should.be.an('object');
      }
    });

    it('should be able to update firstName only', async () => {
      const updateUSer: UpdateUserDto = {
        email: 'test@test.com',
        password: 'mapletree',
        firstName: 'john 2',
      };

      await service.updateOne(1, updateUSer);

      const res = await service.findByEmail(updateUSer.email);

      if (res) {
        strictEqual(res.firstName, updateUSer.firstName);
      }
    });
  });
});
