import { Context, Get, render, HttpResponseNotFound, Config } from '@foal/core';

export class AdminController {
  // @Get('*')
  // renderApp(ctx: Context) {
  //   if (!ctx.request.accepts('html')) {
  //     return new HttpResponseNotFound();
  //   }
  //   const adminPublicDir = Config.get2('settings.adminPublicDir', 'string');
  //   return render(`${adminPublicDir}/index.html`);
  // }
}
