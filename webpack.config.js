/**
 * External dependencies.
 */
const path = require( 'path' );
const MiniCssExtractPlugin = require( 'mini-css-extract-plugin' );

/**
 * Indicates if we're running the build process in production mode.
 *
 * @type {Boolean}
 */
const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
	mode: isProduction ? 'production' : 'development',
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
	externals: [
		'classnames',
		'lodash'
	].reduce( ( memo, name ) => {
		memo[ name ] = `cf.vendor['${ name }']`;

		return memo;
	}, {
		'@carbon-fields/core': 'cf.core',
		'react': 'React',
		'react-dom': 'ReactDOM',
	} ),
	plugins: [
		new MiniCssExtractPlugin( {
			filename: '[name].css'
		} ),
	],
	stats: {
		modules: false,
		hash: false,
		builtAt: false,
		children: false
	}
};
