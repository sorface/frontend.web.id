const {createProxyMiddleware} = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'http://localhost:9000',
            changeOrigin: true,
        })
    );
    app.use(
        '/oauth2',
        createProxyMiddleware({
            target: 'http://localhost:9000',
            changeOrigin: true,
        })
    );
    app.use(
        '/logout',
        createProxyMiddleware({
            target: 'http://localhost:9000',
            changeOrigin: true,
        })
    );
};
