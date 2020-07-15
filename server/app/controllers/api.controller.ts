import { controller } from '@foal/core';
import { AuthController } from '../plugins/auth/auth.controller';

export class ApiController {
  subControllers = [controller('/auth', AuthController)];
}
