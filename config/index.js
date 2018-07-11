// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path');
var publicPath = process.env.ASSETS_HOST ? process.env.ASSETS_HOST : '/';

module.exports = {
	build: {
		env: require('./prod.env'),
		index: '',
		assetsRoot: path.resolve(__dirname, '../dist'),
		assetsSubDirectory: 'static',
		assetsPublicPath: publicPath,
		productionSourceMap: false,
		// Gzip off by default as many popular static hosts such as
		// Surge or Netlify already gzip all static assets for you.
		// Before setting to `true`, make sure to:
		// npm install --save-dev compression-webpack-plugin
		productionGzip: true,
		productionGzipExtensions: ['js', 'css'],
		// Run the build command with an extra argument to
		// View the bundle analyzer report after build finishes:
		// `npm run build --report`
		// Set to `true` or `false` to always turn it on or off
		bundleAnalyzerReport: process.env.npm_config_report
	},
	dev: {
		env: require('./dev.env'),
		port: 8686,
		autoOpenBrowser: false,
		assetsSubDirectory: 'static',
		assetsPublicPath: '/',
		proxyTable: {
			'/api': {
				//target: 'http://47.98.47.48:8009',
				//target: 'http://10.17.8.85:8009',
				//target: 'http://47.98.47.48:9004',//云服务器
				//				target: 'http://120.27.229.33:8090', //开发服务器http://120.55.41.18:8081
				//				target: 'http://10.17.5.117/api/',
				target: 'http://120.55.41.18/api/', //测试服务器
				//target: 'http://47.98.198.212/api/',//预发布环境服务器
				secure: false,
				changeOrigin: true,
				pathRewrite: {
					'^/api': ''
				},
				onProxyReq(proxyReq, req, res) {
					//proxyReq.setHeader('Referer', 'http://47.98.47.48:9004');
					//proxyReq.setHeader('Origin', 'http://47.98.47.48:9004');
					//					proxyReq.setHeader('Referer', 'http://10.17.5.117/api/'); //开发服务器
					//					proxyReq.setHeader('Origin', 'http://10.17.5.117/api/'); //开发服务器
					proxyReq.setHeader('Referer', 'http://120.55.41.18/api/'); //测试服务器
					proxyReq.setHeader('Origin', 'http://120.55.41.18/api/'); //测试服务器
					//proxyReq.setHeader('Referer', 'http://47.98.198.212/api/');//预发布环境服务器
				},
				onProxyRes(proxyRes, req, res) {
					proxyRes.headers['Access-Control-Request-Origin'] = '*';
					proxyRes.headers['Access-Control-Request-Headers'] = '*';
				}
			}
		},
		// CSS Sourcemaps off by default because relative paths are "buggy"
		// with this option, according to the CSS-Loader README
		// (https://github.com/webpack/css-loader#sourcemaps)
		// In our experience, they generally work as expected,
		// just be aware of this issue when enabling this option.
		cssSourceMap: false
	}
}