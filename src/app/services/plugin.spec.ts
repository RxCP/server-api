import { createApp } from '@foal/core';

import request from 'supertest';
// import * as express from 'express';

import { AutoloadPlugins } from './plugin';

describe('AutoloadPlugins', () => {
  // it('should return an express instance', () => {
  //   const expected = express();
  //   const loadedPlugins = AutoloadPlugins('./src/app/tests/plugins');
  //   const actual = createApp(class { }, loadedPlugins);

  //   strictEqual(actual, expected);
  // })

  describe('Auto loaded TestController', () => {
    it('should return a HttpResponseOK.', () => {
      const loadedPlugins = AutoloadPlugins('tests/plugins');
      const app = createApp(class {}, loadedPlugins);

      return request(app).get('/test-plugin').expect(200);
    });
  });
});
