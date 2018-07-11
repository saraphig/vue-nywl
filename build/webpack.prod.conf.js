const path = require('path');
const utils = require('./utils');
const webpack = require('webpack');
const merge = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const baseWebpackConfig = require('./webpack.base.conf');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

let config = require('../config');
// 判断是什么项目
let externals = {};
let prjectName = config.build.env.PROJECT_NAME;
if(prjectName == 'nongye'){
  externals = {
    'echarts': 'echarts'
  };
}else if(prjectName == 'admin'){}

let env = process.env.NODE_ENV === 'testing'
  ? require('../config/test.env')
  : config.build.env;

// add hot-reload related code to entry chunks
Object.keys(baseWebpackConfig.entry).forEach(function (name) {
  baseWebpackConfig.entry[name] = ['babel-polyfill'].concat(baseWebpackConfig.entry[name])
});

let webpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({
      sourceMap: config.build.productionSourceMap,
      extract: true,
      usePostCSS: true
    })
  },
  devtool: config.build.productionSourceMap ? '#source-map' : false,
  output: {
    path: config.build.assetsRoot,
    //filename: utils.assetsPath('[name].[chunkhash].js'),
    filename: utils.assetsPath('[name].[chunkhash].js'),
    chunkFilename: utils.assetsPath('[name].[id].[chunkhash].js')
  },
  externals: { ...externals },
  plugins: [
    new CleanWebpackPlugin(['./dist'], {
      root: path.resolve(__dirname, '../')
    }),
    // http://vuejs.github.io/vue-loader/en/workflow/production.html
    new webpack.DefinePlugin({
      'process.env': env
    }),
    new UglifyJsPlugin({
      uglifyOptions: {
        compress: {
		    warnings: false,
          //drop_debugger: true,
          //drop_console: true,
		      //pure_funcs: ['console.log']  //移除console
        }
      },
      sourceMap: true,
      parallel: true
    }),
    new webpack.optimize.ModuleConcatenationPlugin(),
    // extract css into its own file
    new ExtractTextPlugin({
      // filename: utils.assetsPath('[name].[contenthash].css')
      filename: utils.assetsPath('[name]/[name].css')
    }),
    // Compress extracted CSS. We are using this plugin so that possible
    // duplicated CSS from different components can be deduped.
    new OptimizeCSSPlugin({
      cssProcessorOptions: {
        safe: true
      }
    }),
    // copy custom static assets
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: config.build.assetsSubDirectory,
        ignore: ['.*']
      }
    ])
  ]
});

if (config.build.productionGzip) {
  let CompressionWebpackPlugin = require('compression-webpack-plugin');

  webpackConfig.plugins.push(
    new CompressionWebpackPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: new RegExp(
        '\\.(' +
        config.build.productionGzipExtensions.join('|') +
        ')$'
      ),
      threshold: 10240,
      minRatio: 0.8
    })
  )
}

if (config.build.bundleAnalyzerReport) {
  let BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
  webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}

// get page list
let pages = utils.getEntries('./view/**/*.html');

// according page name to vendor
// split vendor js into its own file
for (let page in pages) {
  // common
  let _common = {
    name: 'vendor-'+page,
    chunks: [page],
    minChunks: function (module, count) {
      // any required modules inside node_modules are extracted to vendor
      return (
        module.resource &&
        /\.js$/.test(module.resource) &&
        module.resource.indexOf(
          path.join(__dirname, '../node_modules')
        ) === 0
      )
    }
  };

  // manifest
  let _manifest = {
    name: 'manifest-'+page,
    chunks: ['vendor-'+page]
  };

  // CommonsChunkPlugin
  webpackConfig.plugins.push(new webpack.optimize.CommonsChunkPlugin(_common));

  // extract webpack runtime and module manifest to its own file in order to
  // prevent vendor hash from being updated whenever app bundle is updated
  webpackConfig.plugins.push(new webpack.optimize.CommonsChunkPlugin(_manifest));
}

// https://github.com/ampedandwired/html-webpack-plugin
// html webpack plugin
for (let page in pages) {
  // 配置html文件
  let _config = {
    filename: page+'.html',
    template: pages[page], // 模板路径
    inject: true,
    favicon: path.resolve('favicon.ico'),
    chunks: [`manifest-${page}`,`vendor-${page}`,`${page}`],
    // excludeChunks: Object.keys(pages).filter(item => {
    //   return (item != page)
    // }),
    //minify: {
      //removeComments: true,
      //collapseWhitespace: true,
      //removeAttributeQuotes: true

      // more options:
      // https://github.com/kangax/html-minifier#options-quick-reference
    //},
  // necessary to consistently work with multiple chunks via CommonsChunkPlugin
  chunksSortMode: 'dependency'
};
  // 需要配置后生成的html
  webpackConfig.plugins.push(new HtmlWebpackPlugin(_config))
}

module.exports = webpackConfig;
