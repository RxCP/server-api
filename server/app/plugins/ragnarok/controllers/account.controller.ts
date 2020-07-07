import { Context, Get, HttpResponseOK } from '@foal/core';

// @route /account
export class AccountController {
  @Get('/')
  index(ctx: Context) {
    return new HttpResponseOK('Account Controller');
  }

  @Get('/characters')
  characters(ctx: Context) {
    return new HttpResponseOK('Account characters');
  }
}
