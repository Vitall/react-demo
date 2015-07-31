module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    watch: {
      express: {
        files:  [ 
          'src/**/*.js',
          'assets/**/*.css',
          'src/**/*.html',
          'Gruntfile.js'
        ],
        tasks:  [ 'build' ],
        options: {
          spawn: false
        }
      }
    },
    'http-server': {
      'dev': {
          root: 'public',
          port: 8282,
          host: '0.0.0.0',
          cache: 0,
          showDir : true,
          autoIndex: true,
          ext: 'html', 
          runInBackground: true
      }
    },
    copy: {
      main: {
        files: [
          { 
            expand: true,
            cwd: './src/',
            src: ['index.html'],
            dest: './public/',
            filter: 'isFile'
          },
          { 
            expand: true,
            cwd: './src/components',
            src: ['*.js'],
            dest: './public/js',
            filter: 'isFile'
          },
          {
            expand: true,
            cwd: './.tmp/',
            src: ['*.js', '*.css'],
            dest: './public/',
            filter: 'isFile'
          }
        ]
      }
    },
    concat: {
      libjs: {
        src: [
          './bower_components/react/react.js',
          './bower_components/react/JSXTransformer.js',
          './bower_components/mui/dist/react/mui-react.min.js',
        ],
        dest: './.tmp/libs.js'
      },
      css: {
        src: [
          './bower_components/mui/dist/css/mui.css',
          './assets/css/*.css'
        ],
        dest: './.tmp/style.css'
      }
    },
    clean: {
      before: {
        src: ['./public/*']
      },
      after:{
        src: ['./.tmp']
      },
    },
  });

  grunt.registerTask('build', [ 'clean:before', 'concat:libjs', 'concat:css', 'copy', 'clean:after']);

  grunt.registerTask('dev', [ 'build', 'http-server', 'watch' ]);

  grunt.registerTask('default', ['dev']);

};