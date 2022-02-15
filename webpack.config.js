/**
 * External dependencies.
 */
const path = require( 'path' );
const MiniCssExtractPlugin = require( 'mini-css-extract-plugin' );
const TerserPlugin = require( 'terser-webpack-plugin' );

/**
 * Indicates if we're running the build process in production mode.
 *
 * @type {Boolean}
 */
const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
	mode: isProduction ? 'production' : 'development',
	devtool: 'source-map',
	entry: {
		bundle: './src/index.js'
	},
	output: {
		path: path.resolve( __dirname, 'build' ),
		filename: '[name].js'
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						cacheDirectory: true
					}
				}
			},
			{
				test: /\.scss$/,
				use: [
					MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader',
						options: {
							importLoaders: 2
						}
					},
					{
						loader: 'postcss-loader'
					},
					{
						loader: 'sass-loader'
					}
				]
			}
		]
	},
	externals: {
		'@carbon-fields/core': 'cf.core',
		'react': 'React',
		'react-dom': 'ReactDOM',
	},
	plugins: [
		new MiniCssExtractPlugin( {
			filename: '[name].css'
		} ),
	],
	optimization: {
		minimize: isProduction,
		minimizer: [
			new TerserPlugin( {
				extractComments: false,
			} ),
		],
	},
	stats: {
		modules: false,
		hash: false,
		builtAt: false,
		children: false
	}
};
