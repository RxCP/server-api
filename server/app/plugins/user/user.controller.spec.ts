import { Context, createController, isHttpResponseOK } from '@foal/core';
import { assert } from 'chai';
import { UserController } from './user.controller';

describe('UserController', () => {
  const users = [
    {
      id: 1,
      email: 'fizz@buzz.com',
    },
    {
      id: 2,
      email: 'buzz@fizz.com',
    },
  ];

  const userServiceMock = {
    findAll() {
      return {
        data: users,
        count: users.length,
      };
    },
    findById(id: number) {
      return users.find((u) => u.id === id);
    },
    createOne(usersDto: {}) {
      return usersDto;
    },
  };

  const controller = createController(UserController, {
    userService: userServiceMock,
  });

  beforeEach(() => []);

  describe('GET /users', () => {
    it('should return all users', async () => {
      const ctx = new Context({});

      const response = await controller.index(ctx);

      if (!isHttpResponseOK(response)) {
        throw new Error('The response should be an HttpResponseOK');
      }

      assert.deepEqual(response.body, userServiceMock.findAll());
    });
  });

  describe('GET /users/:id', () => {
    it('should return user info', async () => {
      const ctx = new Context({
        params: {
          id: 1,
        },
      });

      const response = await controller.findOne(ctx);

      if (!isHttpResponseOK(response)) {
        throw new Error('The response should be an HttpResponseOK');
      }

      assert.deepEqual(response.body, userServiceMock.findById(1));
    });
  });

  describe('POST /users', () => {
    const newUser = {
      email: 'johngerome@test.com',
      password: 'killmeall',
      firstName: 'john',
      lastName: 'smith',
      thishouldbeignored: 'thishouldbeignored',
    };

    it('should create one user and display success message', async () => {
      const ctx = new Context({
        body: newUser,
      });

      const response = await controller.createOne(ctx);

      if (!isHttpResponseOK(response)) {
        throw new Error('The response should be an HttpResponseOK');
      }

      assert.deepEqual(response.body, { message: 'Registered!' });
    });
  });
});
