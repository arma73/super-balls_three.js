const webpack = require("webpack");
const {BundleAnalyzerPlugin} = require("webpack-bundle-analyzer");
const merge = require("webpack-merge");
const baseWebpackConfig = require("./webpack.base.conf");

const devWebpackConfig = merge(baseWebpackConfig, {
	"mode": "development",
	//Devtool: "cheap-module-eval-source-map",
	"devtool": "eval-source-map",
	"devServer": {
		"contentBase": baseWebpackConfig.externals.paths.dist,
		"port": 8082,
		"overlay": {
			"warnings": true,
			"errors": true,
			"host": "0.0.0.0",
			"stats": "minimal"
		},
		"historyApiFallback": true
	},
	"plugins": [
		new webpack.SourceMapDevToolPlugin({
			"filename": "[file].map"
		}),
		new BundleAnalyzerPlugin()
	]
});

module.exports = new Promise((resolve) => {
	resolve(devWebpackConfig);
});
