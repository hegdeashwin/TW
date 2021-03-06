module.exports = function(grunt) {
    'use strict';

    /**
     * Setup configuration
     */
    grunt.initConfig({
        configuredFiles: grunt.file.readJSON('config/servefiles.json'),

        clean: {
            build: ['prod']
        },
        shell: {
            uglify: {
                command: [
                    'node config/r.js -o config/build/optimize-build.js',
                    'node config/r.js -o config/build/copy-build.js',
                    'rm src/main-optimize.js',
                    'rm prod/main.js',
                    'mv prod/main-optimize.js prod/main.js'
                ].join('&&')
            }
        },
        jshint: {
            options: {
                jshintrc: 'config/lints/.jshintrc',
                ignores: '<%= configuredFiles.jshint.ignore %>'
            },
            all: '<%= configuredFiles.jshint.files %>'
        },
        jscs: {
            options: {
                config: 'config/lints/.jscsrc'
            },
            src: '<%= configuredFiles.jscs.files %>',
        },
        jsonlint: {
            files: {
                src: '<%= configuredFiles.jsonlint %>'
            }
        },
        csslint: {
            strict: {
                options: {
                    csslintrc: 'config/lints/.csslintrc',
                    ignores: '<%= configuredFiles.csslint.ignore %>'
                },
                src: '<%= configuredFiles.csslint.files %>'
            }
        },
        htmlhint: {
            Root_HTML_Files: {
                options: {
                    htmlhintrc: 'config/lints/.htmlhint-n-rc',
                    ignores: '<%= configuredFiles.htmlhint.Root_HTML_Files.ignore %>'
                },
                src: '<%= configuredFiles.htmlhint.Root_HTML_Files.files %>'
            },
            Templates: {
                options: {
                    htmlhintrc: 'config/lints/.htmlhint-t-rc',
                    ignores: '<%= configuredFiles.htmlhint.Templates.ignore %>'
                },
                src: '<%= configuredFiles.htmlhint.Templates.files %>'

            }
        },
        less: {
            customMade: {
                options: {
                    compress: false
                },
                files: '<%= configuredFiles.less.customMade.files %>'
            },
            prod: {
                options: {
                    compress: true
                },
                files: '<%= configuredFiles.less.customMade.files %>'
            }
        },
        watch: {
            less: {
                options: {
                    spawn: false
                },
                files: '<%= configuredFiles.watch.less.files %>',
                tasks: ['less:customMade']
            }
        },
        qunit: {
            options: {
                '--web-security': 'no',
                coverage: {
                    src: ['src/**/*.js'],
                    instrumentedFiles: 'temp/',
                    htmlReport: 'report/coverage',
                    coberturaReport: 'report/'
                }
            },
            all: ['tests/**/*.html']
        },
        strip: {
            main: {
                src: 'prod/src/apps/**/*.js',
                options: {
                    inline: true,
                    nodes: ['console.log', 'debug']
                }
            }
        },
        autoprefixer: {
            options: {
                'browsers': ['last 2 versions']
            },
            multiple: {
                expand: true,
                flatten: true,
                src: 'src/stylesheets/css/common/*.css',
                dest: 'src/stylesheets/css/common/'
            }
        },
        htmlmin: {
            dist: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: '<%= configuredFiles.htmlmin.files %>'
            }
        }
    });

    /**
     * Load tasks
     */
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-strip');
    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-jscs');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-csslint');
    grunt.loadNpmTasks('grunt-htmlhint');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-contrib-qunit');
    grunt.loadNpmTasks('grunt-jsonlint');

    /**
     * Define tasks : Tasks for development eco - system.
     */
    grunt.registerTask('default', [
        'htmlhint',
        'csslint',
        'jshint',
        'jscs',
        'jsonlint',
        'less:customMade',
        'autofix'
    ]);
    grunt.registerTask('dev', ['default']); // Alias for `default`.

    /**
     * Define tasks : Tasks for build eco - system.
     */
    grunt.registerTask('build', [
        'htmlhint',
        'csslint',
        'jshint',
        'jsonlint',
        'less:prod',
        'autofix',
        'clean',
        'shell',
        'strip',
        'htmlmin'
    ]);

    /**
     * Define tasks : Tasks for less:compilation watch, Also alias for `watch`
     */
    grunt.registerTask('watchless', ['watch:less']);

    /**
     * Define sub-tasks : Tasks for Less compilation.
     */
    grunt.registerTask('compileless', ['less:customMade']);

    /**
     * Define sub-tasks : Alias for `autofix`
     */
    grunt.registerTask('autofix', ['autoprefixer']);

    /**
     * Define sub-tasks : Alias for `tests`
     */
    grunt.registerTask('tests', ['qunit']);

};
