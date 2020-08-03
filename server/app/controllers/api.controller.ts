import { controller } from '@foal/core';
import { AuthController } from '../plugins/auth/auth.controller';
import { UserController } from '../plugins/user/user.controller';

export class ApiController {
  subControllers = [
    controller('/auth', AuthController),
    controller('/users', UserController),
  ];
}
