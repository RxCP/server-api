import { controller } from '@foal/core';

import { PageController } from './controllers';

export class CmsController {
  subControllers = [controller('/page', PageController)];
}
