import { Get, render, Config } from '@foal/core';

export class AuthController {
  @Get('/login')
  login() {
    return render(
      `./themes/${Config.get2('theme', 'string', 'default')}/auth/login.html`,
      {},
    );
  }
}
