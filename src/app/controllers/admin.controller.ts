import { Context, Get, render, HttpResponseNotFound } from '@foal/core';

export class AdminController {
  @Get('*')
  renderApp(ctx: Context) {
    if (!ctx.request.accepts('html')) {
      return new HttpResponseNotFound();
    }

    return render('./public/index.html');
  }
}
