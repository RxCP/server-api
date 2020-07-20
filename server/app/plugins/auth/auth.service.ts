import { LoginUserDto } from '../user/user.dto';
import { dependency, verifyPassword, Config } from '@foal/core';
import { UserService } from '../user/user.service';
import { sign } from 'jsonwebtoken';
import { AccessTokenResponse } from '../../common/interfaces/responseInterfaces';

export class AuthService {
  @dependency
  userService: UserService;

  async loginUser(
    loginUserDto: LoginUserDto,
  ): Promise<AccessTokenResponse | string> {
    const user = await this.userService.findByEmail(loginUserDto.email);

    if (
      !user ||
      !(await verifyPassword(loginUserDto.password, user.password))
    ) {
      return Promise.reject('Invalid email or password');
    }

    const authToken = sign(
      {
        email: user.email,
      },
      Config.get<string>('settings.jwt.secretOrPublicKey'),
      { expiresIn: '1h' },
    );

    return Promise.resolve({ accessToken: authToken });
  }
}
