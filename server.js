const http = require('http');

const app = require('./app');
const { ENV_PORT, NODE_ENV } = require('./utils/config');
const { enforceHttps } = require('./middlewares/express-sslify.middleware');

const server = http.createServer(app);

if (NODE_ENV === 'production') {
  app.use(enforceHttps);
}
const PORT = ENV_PORT || 3000;

server.listen(PORT, () => {
  console.log(`Your server is listening on port ${PORT}`);
});
