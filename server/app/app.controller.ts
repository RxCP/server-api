import {
  controller,
  Get,
  HttpResponseNotFound,
  HttpResponseMovedPermanently,
} from '@foal/core';

import { ApiController, AdminController } from './controllers';

export class AppController {
  subControllers = [controller('/api', ApiController)];

  @Get('*')
  notFound() {
    return new HttpResponseNotFound(
      'The page your are looking for does not exist',
    );
  }
}
