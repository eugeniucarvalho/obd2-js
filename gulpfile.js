(function() {
    'use strict';
    var gulp = require('gulp'),
        rimraf = require('gulp-rimraf'),
        concat = require('gulp-concat'),
        sourcemaps = require('gulp-sourcemaps'),
        uglify = require('gulp-uglify'),
        runSequence = require('run-sequence');
        
    gulp.task('clean', function() {
        return gulp
            .src(['./dist/*'])
            .pipe(rimraf());
    });
    
    gulp.task('concat', function() {
        return gulp
            .src(['./src/**/*.js'])
            .pipe(concat('obd2-js.js', {
                newLine: '\n'
            }))
            .pipe(gulp.dest('./dist/'));
    });
    
    gulp.task('minify', function() {
        return gulp
            .src('./dist/obd2-js.js')
            .pipe(concat('obd2-js.min.js'))
            .pipe(sourcemaps.init())
            .pipe(uglify())
            .on('error', function(error) {
                console.log(error);
                this.emit('end');
            })
            .pipe(sourcemaps.write('./'))
            .pipe(gulp.dest('./dist/'));
    });
    
    gulp.task('dist', function () {
        return runSequence('clean', 'concat', 'minify');
    });
    
    gulp.task('watch', function() {
        return gulp.watch('src/**/*.js', function() {
            runSequence('clean', 'concat', 'minify');
        });
    });
})();