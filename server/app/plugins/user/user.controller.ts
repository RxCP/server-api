import {
  Context,
  dependency,
  Get,
  HttpResponseBadRequest,
  HttpResponseOK,
  Post,
  Delete,
  Patch,
} from '@foal/core';
import { ValidateDto } from '../../common/hooks/validate-dto.hook';
import { CreateUserDto, UpdateUserDto } from './user.dto';
import { UserService } from './user.service';
import { JWTRequired } from '@foal/jwt';

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

  @Post('/')
  @JWTRequired()
  @ValidateDto(CreateUserDto)
  async createOne(ctx: Context) {
    const newUser: CreateUserDto = ctx.request.body;
    try {
      await this.userService.createOne(newUser);
      return new HttpResponseOK({ message: 'Registered!' });
    } catch (message) {
      return new HttpResponseBadRequest({ message });
    }
  }

  @Patch('/:id')
  @JWTRequired()
  @ValidateDto(UpdateUserDto)
  async updateOne(ctx: Context) {
    const userId = ctx.request.params.id;

    try {
      await this.userService.updateOne(userId, ctx.request.body);
      return new HttpResponseOK({ message: 'Updated!' });
    } catch (message) {
      return new HttpResponseBadRequest({ message });
    }
  }

  @Delete('/:id')
  @JWTRequired()
  async deleteOne(ctx: Context) {
    const userId = ctx.request.params.id;

    try {
      await this.userService.archiveById(userId);

      return new HttpResponseOK({ message: 'Deleted successfully' });
    } catch (error) {
      return new HttpResponseBadRequest({ error });
    }
  }
}
