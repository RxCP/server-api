import { controller, Get, HttpResponseNotFound } from '@foal/core';

import { ApiController } from './controllers';
import { AdminController } from './plugins/admin/admin.controller';

export class AppController {
  subControllers = [
    controller('/admin', AdminController),
    controller('/api', ApiController),
  ];

  @Get('*')
  notFound() {
    return new HttpResponseNotFound({
      message: 'The page your are looking for does not exist',
    });
  }
}
