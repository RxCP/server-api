import {
  Get,
  Context,
  HttpResponseNotFound,
  Config,
  render,
  dependency,
} from '@foal/core';
import { TypeORMStore } from '@foal/typeorm';

export class AdminModule {
  @dependency
  store: TypeORMStore;

  adminPublicDir = Config.get2('settings.adminPublicDir', 'string');

  @Get('/admin')
  admin(ctx: Context) {
    if (!ctx.request.accepts('html')) {
      return new HttpResponseNotFound();
    }

    return render(`${this.adminPublicDir}/index.html`);
  }
}
