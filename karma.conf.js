
    'use strict';
    /*global module*/
    module.exports = function (config) {
        config.set({
            basePath: './',
            frameworks: ['jasmine'],
            files: [
                'node_modules/angular/angular.js',
                'node_modules/angular-mocks/angular-mocks.js',
                'src/**/*.js',
                'tests/unit/*.js'
            ],
            reporters: ['mocha'],
            //browsers: ['Chrome', 'Firefox', 'IE'],
            browsers: ['PhantomJS'],
            singleRun: false
        });
    };