import { Get, Context, HttpResponseOK } from '@foal/core';

export class PageController {
  @Get('/')
  index(ctx: Context) {
    return new HttpResponseOK({ pages: [] });
  }
}
