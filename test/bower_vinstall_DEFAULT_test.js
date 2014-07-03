'use strict';

var grunt = require('grunt');
var path = require('path');
var bower = require('bower');
var lodash = require('lodash');
var _ = lodash;

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports.bower_vinstall_defaults = {
  setUp: function(done) {
    // setup, if necessary
    done();
  },
    verify: function(test) {
        test.expect(4);
        var actual, expected;
        var ok;
        var testpath;
        var semver_re = /^(\d+\.\d+\.\d+)/;

        // get some bower package information
        var bowerlist = bower.command.list({json: true});
        var bowerdeps = bowerlist.dependencies;
        var testpackage = _.first(bowerdeps);

        // get the bower_vinstall grunt configuration
        var config = (grunt.config('bower_vinstall')).default_options || {
            'targetDir': 'bower_components',
            'version': 'semver',
            'clean': false
        };

        // TESTS

        // target directory
        testpath = config.targetDir;
        ok = grunt.file.exists(testpath);
        test.ok(ok, 'targetDir should exist.');

        // component location
        testpath = path.join(config.targetDir, '**/*');
        ok = (grunt.file.expand(testpath)).length > 0;
        test.ok(ok, 'components should be in targetDir.');

        // component folder version
        testpath = path.join(config.targetDir, testpackage.pkgMeta.name + semver_re.find(testpackage.pkgMeta.version));
        ok = grunt.file.exists(testpath);
        test.ok(ok, 'component folder name should include semver version.');

        // bower component cleanup
        grunt.file.setBase(path.join('/'));
        testpath = testpackage.canonicalDir;
        ok = grunt.file.exists(testpath);
        test.ok(ok, 'original bower component location should be populated.');


        test.done();
    },
    tearDown: function(done) {
        grunt.file.setBase(__dirname);
        done();
    }
};
