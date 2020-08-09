// 3p
import { createApp, Config } from '@foal/core';
import request from 'supertest';
import { createConnection, getConnection } from 'typeorm';
// App
import { AppController } from '../../app/app.controller';
import { User } from '../../app/plugins/user/entities';

describe('/api/users', () => {
  let app, accessToken;

  before(async () => {
    await createConnection({
      type: 'sqlite',
      entities: [User],
      database: Config.get2('database.database'),
      dropSchema: Config.get2('database.dropSchema'),
      synchronize: Config.get2('database.synchronize'),
    });
    
    app = createApp(AppController);

    await request(app).post('/api/auth/register').send({
      email: 'johngerome@test.com',
      password: 'xhj17jsh',
      firstName: 'john',
      lastName: 'smith'
    })

    const res = await request(app).post('/api/auth/login').send({
      email: 'johngerome@test.com',
      password: 'xhj17jsh',
    })

    accessToken = res.body.accessToken
  });

  after(() => getConnection().close());

  it('should return a 200 status on GET /api/users requests.', () => {
    return request(app).get('/api/users').expect(200);
  });

  it('should return a 200 status on GET /api/users/:id requests.', () => {
    return request(app).get('/api/users/1').expect(200);
  });

  it('should return a 200 status on POST /api/users requests.', () => {
    return request(app)
      .post('/api/users')
      .auth(accessToken, { type: 'bearer' })
      .send({
        email: 'test@test.com',
        password: 'mapletree',
        firstName: 'john',
        lastName: 'smith',
      })
      .expect(200);
  });

  it('should return a 200 status on PATCH /api/users/:id requests.', () => {
    return request(app)
      .patch('/api/users/1')
      .auth(accessToken, { type: 'bearer' })
      .send({
        email: 'test@test.com',
        password: 'mapletree',
        firstName: 'john 2',
      })
      .expect(200);
  });

  it('should return a 200 status on DELETE /api/users/:d requests.', () => {
    return request(app).delete('/api/users/1').auth(accessToken, { type: 'bearer' }).expect(200);
  });
});
