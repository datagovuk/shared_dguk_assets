module.exports = function(grunt) {
  path = require('path');

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        banner: '/*! VENDOR JS concatenated <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      scripts: {
        src: [ /* Order of resources is important */
          'assets/js/jquery-ui-1.10.2.custom.js',
          'assets/js/underscore-1.1.6.js',
          'assets/js/backbone-0.5.1.js',
          'assets/js/modernizr-2.6.2.custom.js',
          'assets/js/spin.min.js',
          'assets/js/json2.js',
          'assets/js/jquery.tmpl.beta1.js',
          'assets/js/jquery.cookie.min.js',
          'assets/js/jquery.chosen-0.9.7.js',
          'assets/js/jquery.dotdotdot-1.5.9.js',
          'assets/js/jquery.placeholder.js',
          'assets/js/bootstrap-2.0.3.min.js',
          'assets/js/bootstrap-hashchange.js'
        ],
        dest: 'assets/js/vendor.js'
      },
      styles: {
        src: [  /* Order of resources is important. */
          'src/css/bootstrap.css',
          'src/css/bootstrap-responsive.css',
          'src/css/jquery-ui-1.10.2.custom.css',
          'src/css/jquery.chosen.css',
          'src/css/elements.less',
          'src/css/dgu-shared.less',
          'src/css/dgu-drupal.less',
          'src/css/dgu-ckan.less'
        ],
        dest: 'assets/css/datagovuk.less'
      }
    },
    uglify: {
      options: {
        banner: '/*! VENDOR JS minified <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: 'assets/js/vendor.js',
        dest: 'assets/js/vendor.min.js'
      }
    },
    less: {
      options: {
        banner: '/* dgu-less compiled <%= grunt.template.today("yyyy-mm-dd") %> */\n',
        yuicompress: true
      },
      build: {
        src: 'assets/css/datagovuk.less',
        dest: 'assets/css/datagovuk.min.css'
      }
    },
    watch: {
      styles: {
        files: 'assets/css/**.less',
        tasks: 'styles'
      }
    },
    imagemin: {
      build: {
        options: { 
          optimizationLevel: 3
        },
        files: [
          {
            expand: true,
            src: '*.jpg',
            cwd: 'src/img/',
            dest: 'assets/img/'
          },
          {
            expand: true,
            src: '*.png',
            cwd: 'src/img/',
            dest: 'assets/img/'
          }
        ]
      },
    },
    timestamp: {
      build: {
        dest: 'assets/timestamp'
      }
    }
  });

  grunt.registerMultiTask('timestamp', 'Write timestamp to a file', function(myName, myTargets) {
    grunt.file.write(this.files[0].dest, Date.now());
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task(s).
  grunt.registerTask('styles', ['concat:styles','less:build','timestamp']);
  grunt.registerTask('scripts', ['concat:scripts','uglify:build','timestamp']);
  grunt.registerTask('default', ['styles','scripts','imagemin','timestamp']);
};
