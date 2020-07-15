import { Get, Context, HttpResponseNotFound, Config, render } from '@foal/core';

export class AdminController {
  adminPublicDir = Config.get2('settings.adminPublicDir', 'string');

  @Get('*')
  admin(ctx: Context) {
    if (!ctx.request.accepts('html')) {
      return new HttpResponseNotFound({
        message: 'The page your are looking for does not exist',
      });
    }

    return render(`${this.adminPublicDir}/index.html`);
  }
}
