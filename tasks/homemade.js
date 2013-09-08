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
	grunt.registerMultiTask('homemade', 'Micro js preprocessor', function() {
		var context = _.extend({},defaultEnv, this.data.context), files;

		if (this.data) {
			for (var to in this.data) {
				if (to == 'context') continue;
				var src = this.data[to];
				src = grunt.template.process(src);
				homemade.handleFile(src,grunt.template.process(to),context);
			}
		}

	});
};
