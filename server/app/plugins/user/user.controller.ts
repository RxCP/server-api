import {
  Context,
  dependency,
  Get,
  HttpResponseBadRequest,
  HttpResponseOK,
} from '@foal/core';
import { UnserializeBody } from '@foal/typestack';
import { User } from './entities';
import { UserService } from './user.service';

export class UserController {
  @dependency
  userService: UserService;

  @Get('/')
  async index(ctx: Context) {
    const query = {
      take: Number(ctx.request.query.take),
      skip: Number(ctx.request.query.skip),
    };

    try {
      const res = await this.userService.findAll(query);

      return new HttpResponseOK(res);
    } catch (error) {
      return new HttpResponseBadRequest({ error });
    }
  }
}
