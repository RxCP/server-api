import 'source-map-support/register';

// std
import * as http from 'http';

// 3p
import { Config, createApp } from '@foal/core';
import { createConnection } from 'typeorm';
import express from 'express';
import rateLimit from 'express-rate-limit';

// App
import { AppController } from './app/app.controller';
// import { AutoloadPlugins } from './app/services/plugin';

async function main() {
  await createConnection();

  const expressApp = express();

  expressApp.use(
    rateLimit({
      max: 100, // limit each IP to 100 requests per windowMs
      windowMs: 15 * 60 * 1000, // 15 minutes
      handler: function (req, res, next) {
        // Set default FoalTS headers to the response of limited requests
        res.removeHeader('X-Powered-By');
        res.setHeader('X-Content-Type-Options', 'nosniff');
        res.setHeader('X-DNS-Prefetch-Control', 'off');
        res.setHeader('X-Download-Options', 'noopen');
        res.setHeader('X-Frame-Options', 'SAMEORIGIN');
        res.setHeader('X-XSS-Protection', '1; mode=block');
        res.setHeader(
          'Strict-Transport-Security',
          'max-age=15552000; includeSubDomains',
        );

        // Set CORS headers
        res.setHeader('Access-Control-Allow-Origin', '*');
        if (req.method === 'OPTIONS') {
          res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
          res.setHeader(
            'Access-Control-Allow-Methods',
            'HEAD, GET, POST, PUT, PATCH, DELETE',
          );
        }

        // Send the response with the default statusCode and message from rateLimit
        res.status(this.statusCode).send(this.message);
      },
    }),
  );

  // const app = createApp(AppController, { expressInstance: AutoloadPlugins() });
  const app = createApp(AppController, expressApp);

  const httpServer = http.createServer(app);
  const port = Config.get2('port', 'number', 3001);

  httpServer.listen(port, () => {
    console.log(`Listening on port ${port}...`);
  });
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
