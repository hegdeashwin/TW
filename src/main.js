/***
 * The goal of this file is mainly to intialize require.js AMD module loader configuration.
 */
requirejs.config({
    /***
     * The path where your JavaScripts files are located.
     */
    baseUrl: '.',

    /***
     * Path config is also part of Require and allows to define paths for vendors
     * not found directly under baseUrl.
     * See http://requirejs.org/docs/api.html#config-paths for details.
     */
    paths: {
        /*** List of libraries to be included in the codebase. ***/
        'jquery': 'systems/libs/jquery.min',
        'signals': 'systems/libs/signals.min',
        'hasher': 'systems/libs/hasher.min',
        'crossroads': 'systems/libs/crossroads.min',
        'text': 'systems/libs/text.min',
        'handlebars': 'systems/libs/handlebars.min',
        'bootstrap': 'systems/frameworks/bootstrap/js/bootstrap.min',
        'datepicker': 'systems/frameworks/bootstrap/plugins/bootstrap-datepicker',
        'template': 'systems/utilities/hb-template-mapper',
        'templates': '../../templates'
    },

    /***
     * shim config is part of `Require 2.0`_ and allows to Configure the dependencies
     * and exports for older, traditional “browser globals” scripts that do not use
     * define() to declare the dependencies and set a module value.
     * See http://requirejs.org/docs/api.html#config-shim for more details.
     */
    shim: {
        "text": {
            exports: 'text'
        },
        "signals": {
            exports: 'signals'
        },
        "hasher": {
            deps: ['signals'],
            exports: 'hasher'
        },
        "crossroads": {
            deps: ['signals', 'hasher'],
            exports: 'crossroads'
        },
        "handlebars": {
            exports: 'Handlebars'
        },
        "bootstrap": {
            deps: ['jquery'],
            exports: 'bootstrap'
        },
        "datepicker": {
            deps: ['bootstrap', 'jquery'],
            exports: 'datepicker'
        }
    }
});

require(['apps/router/routes']);