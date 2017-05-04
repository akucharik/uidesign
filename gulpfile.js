'use strict';

var babelify = require('babelify');
var browserify = require('browserify');
var buffer = require('vinyl-buffer');
var del = require('del');
var gulp = require('gulp');
var gulpif = require('gulp-if');
var lint = require('gulp-eslint');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var source = require('vinyl-source-stream');
var uglify = require('gulp-uglify');

var config = {
    environment: 'production',
    development: {
        minify: false,
        sourcemaps: true
    },
    production: {
        minify: true,
        sourcemaps: false
    },
    scripts: {
        destDirectory: './scripts',
        destFileName: 'site.js',
        source: './src/scripts/site.js'
    },
    styles: {
        destDirectory: './styles',
        paths: [
            './src/styles',
            './node_modules/foundation-sites/scss',
            './node_modules/font-awesome/scss'
        ],
        source: './src/styles/site.scss'
    }
};

process.env.NODE_ENV = config.environment;

gulp.task('default', ['build']);

gulp.task('build', ['compile:styles', 'compile:scripts'], () => {
    return;
});

gulp.task('clean:scripts', () => {
    return del(config.scripts.destDirectory);
});

gulp.task('clean:styles', () => {
    return del(config.styles.destDirectory);
});

gulp.task('compile:scripts', ['clean:scripts', 'lint'], () => {
    return browserify(config.scripts.source, { 
            debug: config[config.environment].sourcemaps,
            transform: babelify
        })
        .bundle()
        .on('error', (error) => { 
            console.log('Error: ' + error.message); 
        })
        .pipe(source(config.scripts.destFileName))
        
        // Minify
        .pipe(buffer())
        .pipe(gulpif(config[config.environment].minify, uglify()))
        .pipe(gulpif(config[config.environment].minify, rename({suffix: '.min'})))
        .pipe(gulp.dest(config.scripts.destDirectory));
});

gulp.task('compile:styles', ['clean:styles'], () => {
    return gulp.src(config.styles.source)
        .pipe(sass({
            includePaths: config.styles.paths,
            outputStyle: config[config.environment].minify ? 'compressed' : 'expanded'
        }).on('error', sass.logError))
        .pipe(gulpif(config[config.environment].minify, rename({suffix: '.min'})))
        .pipe(gulp.dest(config.styles.destDirectory));
});

gulp.task('lint', () => {
    return gulp.src(['./src/scripts/*.js','!node_modules/**'])
        .pipe(lint())
        .pipe(lint.format())
        .pipe(lint.failAfterError());
});