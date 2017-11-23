const htmlStandards = require('reshape-standard')
const cssStandards = require('spike-css-standards')
const jsStandards = require('spike-js-standards')
const pageId = require('spike-page-id')
const sugarml = require('sugarml')
const sugarss = require('sugarss')
const env = process.env.SPIKE_ENV
const Records = require('spike-records')		// JSON

const standard = require('reshape-standard')	// JSON
const locals = {}								// JSON

	// end Json

module.exports = {
	devtool: 'source-map',
	matchers: { html: '*(**/)*.sgr', css: '*(**/)*.sss' },
	ignore: ['**/layout.sgr', '**/_*', '**/.*', 'readme.md', 'yarn.lock'],
	
	reshape: htmlStandards({
		parser: sugarml,
		locals: () => locals,
		minify: env === 'production'
	}),
	
	postcss: cssStandards({
		parser: sugarss,
		minify: env === 'production',
		warnForDuplicates: env !== 'production'
	}),
	
	babel: jsStandards(),
	
	// JSON
	plugins: [new Records({
		addDataTo: locals,
		myData: { 
			file: '/data/data.json'
			//transform: (data) => data.menu
		},
		artworks: { 
			file: '/data/artworks.json'
			//transform: (data) => data.artworks
    },
    
    artworks: {
      file: '/data/artworks.json',
      template: {
        path: 'views/templates/artwork.sgr',
        output: (artwork) => { return `artworks/${artwork.id}.html` }
      }
    }
	})]
}
