const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api', // Prefix for API requests
    createProxyMiddleware({
      target: 'http://localhost:88', // Your API server's address
      changeOrigin: true,
    })
  );
};
