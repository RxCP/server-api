import { controller, Get, HttpResponseNotFound } from '@foal/core';

import { ApiController, AdminController } from './controllers';

export class AppController {
  subControllers = [
    controller('/api', ApiController),
    controller('/admin', AdminController),
  ];

  @Get('*')
  notFound() {
    return new HttpResponseNotFound(
      'The page your are looking for does not exist',
    );
  }
}
