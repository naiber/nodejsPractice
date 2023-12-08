'use strict';

const path = require('path');
const AutoLoad = require('fastify-autoload');
const attacker = '211.133.33.113';

module.exports = async function (fastify, opts) {

  fastify.get('/', (req, rep) => {
    const ip = req.ip || req.socket.remoteAddress;
  
    if (ip === attacker) {
      return rep.code(403).send();
    }
  
    rep.send();
  })
  // Place here your custom code!

  // Do not touch the following lines

  // This loads all plugins defined in plugins
  // those should be support plugins that are reused
  // through your application
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'plugins'),
    options: Object.assign({}, opts),
  });

  // This loads all plugins defined in routes
  // define your routes in one of these
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'routes'),
    options: Object.assign({}, opts),
  });
};
