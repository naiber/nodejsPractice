// import path from 'path';
const Fastify = require('fastify');
// import FView from '@fastify/view';
// import ejs from 'ejs';
// import dbConnector from './plugin/db-connector.js';
// import userRoutes from './routes/user.js';


// const __dirname = path.resolve(path.dirname(""))

const fastify = Fastify({
  logger: true,
});

// fastify.register(dbConnector);
// fastify.register(userRoutes, { prefix: '/users' });

// fastify.register(FView, {
//   engine: {
//     ejs,
//     root: path.join(__dirname, 'views'),
//     defaultContext: {
//       dev: process.env.NODE_ENV === 'development', // Inside your templates, `dev` will be `true` if the expression evaluates to true
//     }
//   },
// });

fastify.listen({ port: 3000 }, function (err, address) {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  fastify.log.info(`server listening on ${address}`);
});
