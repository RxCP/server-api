// 3p
import { createApp, Config } from '@foal/core';
import request from 'supertest';
import { createConnection, getConnection } from 'typeorm';

// App
import { AppController } from '../app/app.controller';
import { User } from '../app/plugins/user/entities';

describe('The server', () => {
  let app;

  before(async () => {
    await createConnection({
      type: 'sqlite',
      entities: [User],
      database: Config.get2('database.database'),
      dropSchema: Config.get2('database.dropSchema'),
      synchronize: Config.get2('database.synchronize'),
    });
    app = createApp(AppController);
  });

  after(() => getConnection().close());

  it('should return a 200 status on GET / requests.', () => {
    return request(app).get('/').expect(200);
  });
});
