/*
 * homemade grunt task
 * https://github.com/dmitry/homemade
 *
 * Copyright © 2013 Dmitry
 * Licensed under the MIT license.
 */

var path = require('path'),
	homemade = require('../homemade');

var defaultEnv = {};

module.exports = function(grunt) {
	var _ = grunt.utils._;
	grunt.registerMultiTask('homemade', 'C-like js preprocessor', function() {
		var context = _.extend({},defaultEnv, this.data.context), files;

		//handle context variables
		for (var key in context){
			context[key] = grunt.template.process(context[key])
		}

		//go through all data instances, preprocess
		if (this.data) {
			for (var key in this.data) {
				if (key == 'context') continue;
				var src = grunt.template.process(this.data.src), dest = this.data.dest;

				homemade.handleFile(src, grunt.template.process(dest), context);
			}
		}

	});
};
