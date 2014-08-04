/* jshint node:true */
'use strict';
module.exports = function (grunt) {

  var config = {
    pkg: grunt.file.readJSON('package.json'),
    baseDir: '.',
    srcDir: 'src',
    destDir: 'dist',
    tempDir: 'tmp',
    docsDir: 'docs/',
    unitTests: 'test/unit/specs/**/*.js',
    unitTestDir: 'test/unit/',
    debian_package: {
      options: {
        maintainer: {
          name: "Applied Network Solutions",
          email: "info@ansfederal.com"
        },
        prefix: "",
        name: "netvistra-ui",
        postfix: "",
        short_description: "NetVistra UI",
        long_description: "This is a custom build of the ElasticSearch " +
                          "Kibana project provided by the NetVistra team " + 
                          "at Applied Network Solutions",
        version: "1.0",
        build_number: "1",
        links: [],
        directories: []
      },
      files: 
        {
          expand: true,
          cwd: 'dist/',
          src: [
            '**/*.js',
            '**/*.html',
            '**/*.css',
            '**/*.json'
          ],
          dest: '/usr/share/netvistra-ui'
        }
    }
  };

  // load plugins
  require('load-grunt-tasks')(grunt);

  // load task definitions
  grunt.loadTasks('tasks');

  // Utility function to load plugin settings into config
  function loadConfig(config,path) {
    require('glob').sync('*', {cwd: path}).forEach(function(option) {
      var key = option.replace(/\.js$/,'');
      // If key already exists, extend it. It is your responsibility to avoid naming collisions
      config[key] = config[key] || {};
      grunt.util._.extend(config[key], require(path + option)(config,grunt));
    });
    // technically not required
    return config;
  }

  // Merge that object with what with whatever we have here
  loadConfig(config,'./tasks/options/');

  // pass the config to grunt
  grunt.initConfig(config);

};
