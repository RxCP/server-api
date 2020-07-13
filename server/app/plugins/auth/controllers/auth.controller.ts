import { Context, dependency, HttpResponseOK, Post, ValidateBody, HttpResponseNotFound, verifyPassword } from '@foal/core';
import { UserService } from '../../user/services/user.service';

export class AuthController {
  @dependency
  userService: UserService

  @Post('/login')
  @ValidateBody({
    additionalProperties: false,
    properties: {
        email: { type: 'string', format: 'email' },
        password: { type: 'string' }
    },
    required: ['email', 'password'],
    type: 'object',
  })
  async login(ctx: Context) {
    // const token = sign(
    //   {
    //     sub: '90485234',
    //     id: 90485234,
    //     email: 'mary@foalts.org'
    //   },
    //   Config.get<string>('settings.jwt.secretOrPublicKey'),
    //   { expiresIn: '1h' }
    // );
    const user = this.userService.findOne(ctx.request.body.email);

    if (!user) {
      return new HttpResponseNotFound({ message: 'Invalid email or password' })
    }

    if (!await verifyPassword(ctx.request.body.password, user.password)) {
      return new HttpResponseNotFound({ message: 'Invalid email or password' })
    }

    return new HttpResponseOK({message: 'ok'})
  }
}
