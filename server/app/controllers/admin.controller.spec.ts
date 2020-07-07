// std
import { strictEqual } from 'assert';

// 3p
import {
  Context,
  createController,
  getHttpMethod,
  getPath,
  isHttpResponseOK,
} from '@foal/core';

// App
import { AdminController } from './admin.controller';

describe('AdminController', () => {
  let controller: AdminController;

  beforeEach(() => (controller = createController(AdminController)));

  describe('has a "renderApp" method that', () => {
    it('should handle requests at GET /admin/(*.*)', () => {
      strictEqual(getHttpMethod(AdminController, 'renderApp'), 'GET');
      strictEqual(getPath(AdminController, 'renderApp'), '*');
    });

    it('should return a HttpResponseOK', async () => {
      const ctx = new Context({ accepts: () => true });
      const response = await controller.renderApp(ctx);

      if (!isHttpResponseOK(response)) {
        throw new Error(
          'The response should be an instance of HttpResponseOK.',
        );
      }
    });
  });
});
