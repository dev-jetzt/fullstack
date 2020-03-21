/* eslint-disable @typescript-eslint/quotes */
import * as express from 'express';
import * as cors from 'cors';
import * as helmet from 'helmet';

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

  // Guard error messages with plain 500
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  server.use((err, req, res, next) => {
    res.status(500).send('Server error');
  });

  return server;
};
