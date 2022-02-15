module.exports = {
	presets: [
		[ '@babel/preset-env', {
			modules: false
		} ],
		[ '@babel/preset-react', {
			pragma: 'wp.element.createElement',
			pragmaFrag: 'wp.element.Fragment'
		} ]
	],
	env: {
		production: {
			plugins: [
				[ '@wordpress/babel-plugin-makepot', {
					output: 'languages/carbon-field-react-select.pot'
				} ]
			]
		}
	}
};
