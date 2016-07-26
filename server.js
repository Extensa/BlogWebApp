'use strict'

const Hapi = require('hapi');
const Db = require('./database');
const secretKey = require('./services/config');
const UserRoutes = require('./services/Users/UserRoutes');
const PostRoutes = require('./services/Posts/PostRoutes');

var server = new Hapi.Server();
server.connection({ host: 'localhost', port: 3000 });

server.register(require('hapi-auth-jwt'), (err) => {
  server.auth.strategy('jwt', 'jwt', {
    key: secretKey,
    verifyOptions: { algorithms: ['HS256'] }
  });
});

server.route(UserRoutes.endpoints);
server.route(PostRoutes.endpoints);

server.start(function (err) {
  if (err) { throw err; }

  console.log('Server running at:', server.info.uri);
});