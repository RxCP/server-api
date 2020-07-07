import { controller } from '@foal/core';

import { AccountController } from './controllers';

export class RagnarokModule {
  subControllers = [controller('/account', AccountController)];
}
