/*
 * grunt-plugin
 * https://github.com/dmitry/homemade
 *
 * Copyright (c) 2013 Dmitry
 * Licensed under the MIT license.
 */

var grunt = require('grunt'),
    path = require('path'),
    homemade = require('../homemade');

grunt.util = grunt.util || grunt.utils;

var _ = grunt.util._;
var defaultEnv = {};

module.exports = function(grunt) {

  // Please see the grunt documentation for more information regarding task and
  // helper creation: https://github.com/gruntjs/grunt/blob/master/docs/toc.md

  // ==========================================================================
  // TASKS
  // ==========================================================================

  grunt.registerMultiTask('homemade', 'Your task description goes here.', function() {
    //grunt.log.write(grunt.helper('plugin'));
    var context = _.extend({},defaultEnv, this.data.context), files;

    if (this.data) {
      for (var to in this.data) {
        if (to == 'context') continue;
        var src = this.data[to];
        src = grunt.template.process(src);
        homemade.handleFile(src,to,context);
      }
    }

  });

  // ==========================================================================
  // HELPERS
  // ==========================================================================

  grunt.registerHelper('plugin', function() {
    return 'plugin!!!';
  });



};
