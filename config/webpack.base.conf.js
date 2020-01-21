/*eslint-disable max-lines */
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const alias = require("./alias");
const path = require("path");

const PATHS = {
	"src": path.join(__dirname, "../src"),
	"dist": path.join(__dirname, "../dist"),
	"assets": "assets/"
};

const conf = {
	"externals": {
		"paths": PATHS
	},
	"entry": {    
		"app": [ "babel-polyfill", `${PATHS.src}/js/app.js`
		]
	},
	"output":{
		"filename": `${PATHS.assets}js/[name].[hash].js`,
		"path": PATHS.dist,
		"publicPath": "./"
	},
	"optimization": {
		"minimizer": [new UglifyJsPlugin()],
		"splitChunks": {
			"cacheGroups":{
				"vendor": {
					"name": "vendors",
					"test": /node_modules/,
					"chunks": "all",
					"enforce": true
				}
			}
		}
	},
	"module":{
		"rules":[
			{
				"test": /\.js$/,
				"use": {
					"loader": "babel-loader",
					"options":{
						"presets": ["@babel/preset-env"]
					}
				}
			},
			{
				"test": /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
				"loader": "file-loader",
				"options": {
					"name": "[name].[ext]"
				}
			},
			{
				"test": /\.(png|jpg|gif|svg)$/,
				"loader": "file-loader",
				"options": {
					"name": "[path][name].[ext]",
					"context": ""
				}
			},
			{
				"test": /\.scss$/,
				"use": [
					"style-loader",
					MiniCssExtractPlugin.loader,
					{
						"loader": "css-loader",
						"options": { "sourceMap": true }
					},
					{
						"loader": "postcss-loader",
						"options": { "sourceMap": true, "config": {"path": path.resolve(__dirname, "./postcss.config.js")} }
					},
					{
						"loader": "sass-loader",
						"options": { "sourceMap": true }
					}
				]
			},
			{
				"test": /\.obj$/,
				"loader": "webpack-obj-loader"
			},
			{
				"test": /\.mtl$/,
				"loader": "mtl-loader"
			},
			{
				"test": /\.css$/i,
				"use": [
					"style-loader",
					MiniCssExtractPlugin.loader,
					{
						"loader": "css-loader",
						"options": { "sourceMap": true }
					},
					{
						"loader": "postcss-loader",
						"options": { "sourceMap": true, "config": {"path": path.resolve(__dirname, "./postcss.config.js")} }
					}
				]
			}
		]        
	},
	"plugins": [
		new MiniCssExtractPlugin({
			"filename": `${PATHS.assets}css/[name].[hash].css`
		}),
		new CopyWebpackPlugin([
			{ 
				from: `${PATHS.src}/public`,
				to: ""
			}
		]),
		new HtmlWebpackPlugin({
			"template": `${PATHS.src}/html/index.html`,
			"filename": `${PATHS.dist}/index.html`
		})
	
	],
	"resolve": {
		alias
	}
};

module.exports = conf;
