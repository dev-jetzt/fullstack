/* eslint-disable @typescript-eslint/quotes */
import * as express from 'express';
import * as cors from 'cors';
import * as helmet from 'helmet';
import path = require('path');
import * as fs from 'fs';

const servePublicAssets = async (server: express.Application) => {
  // Serve the client and files from web_dist directory
  const webDir = path.resolve(__dirname, '..', 'publicAssets');
  // Sanity check if the directory exists
  if (fs.existsSync(webDir) === false) {
    throw new Error('Cannot find the directory: ' + webDir);
  }
  // Serve frontend files if they exist (with correct caching applied)
  server.use(
    '/publicAssets',
    express.static(webDir, {
      etag: false,
      lastModified: false,
      maxAge: 31536000,
    }),
  );
};

const applyCors = async (server: express.Application) => {
  server.use(cors());
};

export const initExpress = async () => {
  const server = express();
  server.disable('x-powered-by');
  await applyCors(server);

  server.use(
    helmet.frameguard({
      action: 'deny',
    }),
  );

  server.use(
    helmet.contentSecurityPolicy({
      directives: {
        defaultSrc: ['*'],
        scriptSrc: ['*'],
        styleSrc: [
          "'unsafe-inline'",
          "'self'",
          'https://use.typekit.net',
          'https://p.typekit.net',
          'https://api.locize.io',
          'https://fonts.googleapis.com',
          'https://tagmanager.google.com',
        ],
        imgSrc: ['*', 'data:'],
        frameSrc: ["'none'"],
        formAction: ["'none'"],
        objectSrc: ["'none'"],
        frameAncestors: ["'none'"],
      },
    }),
  );

  await servePublicAssets(server);

  // Guard error messages with plain 500
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  server.use((err, req, res, next) => {
    res.status(500).send('Server error');
  });

  return server;
};
