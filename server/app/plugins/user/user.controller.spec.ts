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
  };

  const controller = createController(UserController, {
    userService: userServiceMock,
  });

  beforeEach(() => []);

  describe('/users', () => {
    it('should return all users', async () => {
      const ctx = new Context({});

      const response = await controller.index(ctx);

      if (!isHttpResponseOK(response)) {
        throw new Error('The response should be an HttpResponseOK');
      }

      assert.deepEqual(response.body, userServiceMock.findAll());
    });
  });

  describe('/users/:id', () => {
    it('should return 1 user', async () => {
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
});
