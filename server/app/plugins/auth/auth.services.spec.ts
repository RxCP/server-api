import { createService } from '@foal/core';
import { AuthService } from './auth.services';
import { LoginUserDto } from '../user/dto/userDto';
import { User } from '../user/entities';
import chai = require('chai');
const should = chai.should();

describe('AuthService', () => {
  let user, UserServiceMock, service;

  before(async () => {
    user = new User();
    user.email = 'test@test.com';
    await user.setPassword('testpass');

    UserServiceMock = {
      findByEmail() {
        return {
          email: user.email,
          password: user.password,
        };
      },
    };

    service = createService(AuthService, {
      userService: UserServiceMock,
    });
  });

  describe('loginUser()', () => {
    it('should return an access token', async () => {
      const userDto: LoginUserDto = {
        email: user.email,
        password: 'testpass',
      };

      const authToken = await service.loginUser(userDto);
      authToken.should.be.a('object');
    });
  });
});
