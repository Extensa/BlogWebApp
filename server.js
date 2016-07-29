'use strict'

const Hapi = require('hapi');
const Db = require('./database');
const secretKey = require('./api/config');
const UserRoutes = require('./api/Users/UserRoutes');
const PostRoutes = require('./api/Posts/PostRoutes');
const CommentRoutes = require('./api/Comments/CommentRoutes');

var server = new Hapi.Server();
server.connection({ host: 'localhost', port: 3000, routes: { cors: true } });

server.register(require('hapi-auth-jwt'), (err) => {
  server.auth.strategy('jwt', 'jwt', {
    key: secretKey,
    verifyOptions: { algorithms: ['HS256'] }
  });
});

server.route(UserRoutes.endpoints);
server.route(PostRoutes.endpoints);
server.route(CommentRoutes.endpoints);

server.start(function (err) {
  if (err) { throw err; }

  console.log('Server running at:', server.info.uri);
});