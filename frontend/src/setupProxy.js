const { createProxyMiddleware } = require('http-proxy-middleware');

export default function setupProxy(app: any) {
  app.use(
    '/api2',
    createProxyMiddleware({
      target: 'http://localhost:9010',
      changeOrigin: true,
    })
  );
}
