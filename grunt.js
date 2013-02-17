/*example of grunt file*/
module.exports = function(grunt) {

  grunt.loadNpmTasks('homemade');

  // Project configuration.
  grunt.initConfig({
    homemade: {
      js: {
        'test/after.js' : 'test/before.js',
        'test/after-2.js' : 'test/before-2.js',
        context: {
          dev: true
        }
      }
    }
  });

  // Default task.
  grunt.registerTask('default', 'homemade');

};
