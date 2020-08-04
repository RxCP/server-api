import {
  Context,
  dependency,
  Get,
  HttpResponseBadRequest,
  HttpResponseOK,
} from '@foal/core';
import { UserService } from './user.service';

export class UserController {
  @dependency
  userService: UserService;

  @Get('/')
  async index(ctx: Context) {
    const query = {
      take: (ctx.request.query && ctx.request.query.take) || '',
      skip: (ctx.request.query && ctx.request.query.skip) || '',
    };

    try {
      const res = (await this.userService.findAll(query)) || {};

      return new HttpResponseOK(res);
    } catch (error) {
      return new HttpResponseBadRequest({ error });
    }
  }

  @Get('/:id')
  async findOne(ctx: Context) {
    const userId = ctx.request.params.id;

    try {
      const res = (await this.userService.findById(userId)) || {};

      return new HttpResponseOK(res);
    } catch (error) {
      return new HttpResponseBadRequest({ error });
    }
  }
}
