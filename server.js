'use strict'

const Hapi = require('hapi');
const Db = require('./database');
const UserRoutes = require('./services/UserRoutes');
const secretKey = require('./services/config');

var server = new Hapi.Server();
server.connection({ host: 'localhost', port: 3000 });

server.register(require('hapi-auth-jwt'), (err) => {
  server.auth.strategy('jwt', 'jwt', {
    key: secretKey,
    verifyOptions: { algorithms: ['HS256'] }
  });
});

server.route(UserRoutes.endpoints);

server.start(function (err) {
    if (err) { throw err; }

    console.log('Server running at:', server.info.uri);
});