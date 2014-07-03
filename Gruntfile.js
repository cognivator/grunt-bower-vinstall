/*
 * grunt-bower-vinstall
 * https://github.com/slhenty/grunt-bower-vinstall
 *
 * Copyright (c) 2014 cognivator
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        jshint: {
            all: [
                'Gruntfile.js',
                'tasks/*.js',
                '<%= nodeunit.tests %>'
            ],
            options: {
                jshintrc: '.jshintrc'
            }
        },

        // Before generating any new files, remove any previously-created files.
        clean: {
            tests: ['tmp']
        },

        // Configuration to be run (and then tested).
        bower_vinstall_ORIG: {
            default_options: {
                options: {
                },
                files: {
                    'tmp/default_options': ['test/fixtures/testing', 'test/fixtures/123']
                }
            },
            custom_options: {
                options: {
                    separator: ': ',
                    punctuation: ' !!!'
                },
                files: {
                    'tmp/custom_options': ['test/fixtures/testing', 'test/fixtures/123']
                }
            }
        },

        bower_vinstall: {
            default_options: {
                // no option overrides
            },
            version_semver_options: {
                options: {
                    version: "semver"
                }
            },
            version_full_options: {
                options: {
                    version: "full"
                }
            },
            target_options: {
                options: {
                    targetDir: "bower_versions"
                }
            },
            clean_options: {
                options: {
                    clean: true
                }
            }
        },

        // Unit tests.
        nodeunit: {
            default_options: {
                tests: ['test/*_DEFAULT_test.js']
            }
        }

    });

    // Actually load this plugin's task(s).
    grunt.loadTasks('tasks');

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-nodeunit');

    // Whenever the "test" task is run, first clean the "tmp" dir, then run this
    // plugin's task(s), then test the result.
    grunt.registerTask('test', ['clean', 'bower_vinstall', 'nodeunit']);

    // By default, lint and run all tests.
    grunt.registerTask('default', ['jshint', 'test']);

};
