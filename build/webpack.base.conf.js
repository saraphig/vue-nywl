//require("babel-polyfill");
const path = require("path");
const utils = require("./utils");
const config = require("../config");
const vueLoaderConfig = require("./vue-loader.conf");
// entry path
const projectName = config.build.env.PROJECT_NAME;
const entryPath = projectName
    ? `./src/${projectName}/main.js`
    : "./src/**/main.js";

function resolve(dir) {
    return path.join(__dirname, "..", dir);
}

module.exports = {
    entry: utils.getEntries(`${entryPath}`),
    output: {
        path: config.build.assetsRoot,
        // filename: 'static/[name].[hash].js',
        filename: "[name]/[name].js",
        chunkFilename: "[name]/[name].[id].[chunkhash].js",
        publicPath:
            process.env.NODE_ENV === "production"
                ? config.build.assetsPublicPath
                : config.dev.assetsPublicPath
    },
    resolve: {
        extensions: [".js", ".vue", ".json", ".css", ".styl"],
        alias: {
            vue$: "vue/dist/vue.esm.js",
            "@": resolve("src"),
            "@com": resolve("src/lib/component"),
            "@config": resolve("config"),
            "@nongye": resolve("src/nongye"),
            "@lib": resolve("src/lib"),
        }
    },
    externals: {
      'AMap': 'window.AMap',
      'AMapUI': 'AMapUI'
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: "vue-loader",
                options: vueLoaderConfig
            },
            {
                test: /\.js$/,
                loader: "babel-loader",
                include: [resolve("src"), resolve("test")],
                exclude: /node_modules/
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: "url-loader",
                options: {
                    limit: 10000,
                    name: utils.assetsPath("img/[name].[hash:7].[ext]")
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: "url-loader",
                options: {
                    limit: 10000,
                    name: utils.assetsPath("fonts/[name].[hash:7].[ext]")
                }
            }
        ]
    },
	externals: {
		'AMap': 'AMap'
	}
};
