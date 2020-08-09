import {
  Context,
  dependency,
  HttpResponseBadRequest,
  HttpResponseOK,
  Post,
} from '@foal/core';
import { JWTRequired } from '@foal/jwt';
import { ValidateDto } from '../../common/hooks/validate-dto.hook';
import { CreateUserDto, LoginUserDto } from '../user/user.dto';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';

export class AuthController {
  @dependency
  userService: UserService;

  @dependency
  authService: AuthService;

  @Post('/login')
  @ValidateDto(LoginUserDto)
  async login(ctx: Context) {
    try {
      const authToken = await this.authService.loginUser(ctx.request.body);
      return new HttpResponseOK(authToken);
    } catch (message) {
      return new HttpResponseBadRequest({
        message: 'Invalid email or password',
      });
    }
  }

  @Post('/register')
  @ValidateDto(CreateUserDto)
  async register(
    ctx: Context,
  ): Promise<HttpResponseOK | HttpResponseBadRequest> {
    try {
      await this.userService.createOne(ctx.request.body);
      return new HttpResponseOK({ message: 'Registered!' });
    } catch (message) {
      return new HttpResponseBadRequest({ message });
    }
  }

  @JWTRequired()
  @Post('/check')
  checkToken(ctx: Context) {
    return new HttpResponseOK({ message: 'success' });
  }
}
