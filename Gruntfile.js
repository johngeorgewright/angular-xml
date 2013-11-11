/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    connect: {
      options: {
        keepalive: true,
        port: 8000,
        hostname: '0.0.0.0',
        base: '.'
      },
      'dev-server': {
        options: {
          keepalive: true,
          middleware: function (connect, options) {
            return [
              connect.static(options.base),
              connect.directory(options.base),
              connect.logger('dev')
            ];
          }
        }
      },
      'test-server': {
        options: {
          middleware: function (connect, options) {
            return [
              function (req, res, next) {
                if (req.method === 'GET') {
                  res.setHeader('Cache-control', 'public, max-age=3600');
                }
                next();
              },
              connect.static(options.base)
            ];
          }
        }
      }
    },
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        unused: true,
        boss: true,
        eqnull: true,
        globals: {
          angular: false
        }
      },
      gruntfile: {
        src: 'Gruntfile.js'
      },
      module: {
        src: 'angular-xml.js'
      },
      test: {
        options: {
          globals: {
            angular: false,
            describe: false,
            expect: false,
            it: false,
            afterEach: false,
            beforeEach: false,
            module: false,
            inject: false,
            jasmine: false,
            spyOn: false
          }
        },
        src: 'test/**/*.js'
      }
    },
    http: {
      closure: {
        url: 'http://closure-compiler.appspot.com/compile',
        method: 'POST',
        form: {
          output_info: 'compiled_code',
          output_format: 'text',
          compilation_level: 'SIMPLE_OPTIMIZATIONS',
          warning_level: 'default',
          js_code: grunt.file.read('angular-xml.js')
        },
        dest: 'angular-xml.min.js'
      }
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-http');

  // Default task.
  grunt.registerTask('default', ['jshint', 'http']);
  grunt.registerTask('test:e2e', 'Run the end to end tests with Karma and keep a test server running in the background', ['connect:test-server']);

};

