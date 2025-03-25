const {createProxyMiddleware} = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        '/passport/api',
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
