import { Get, HttpResponseOK, Context } from '@foal/core';

// use for testing plugin service
export class TestController {
  @Get('/test-plugin')
  test(ctx: Context) {
    return new HttpResponseOK();
  }
}
