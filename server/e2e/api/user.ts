// 3p
import { createApp } from '@foal/core';
import request from 'supertest';
import { createConnection, getConnection } from 'typeorm';
// App
import { AppController } from '../../app/app.controller';

describe('/api/users', () => {
  let app;

  before(async () => {
    await createConnection();
    app = createApp(AppController);
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
      .send({
        email: 'test@test.com',
        password: 'mapletree',
        firstName: 'john 2',
      })
      .expect(200);
  });

  it('should return a 200 status on DELETE /api/users/:d requests.', () => {
    return request(app).delete('/api/users/1').expect(200);
  });
});
