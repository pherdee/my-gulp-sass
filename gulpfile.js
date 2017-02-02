// source : https://markgoodyear.com/2014/01/getting-started-with-gulp/
// Load plugins
var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    cssnano = require('gulp-cssnano'),
    rename = require('gulp-rename'),
    notify = require('gulp-notify'),
    del = require('del'),
    browserSync = require('browser-sync').create();


// Static Server + watching scss/html files
gulp.task('serve', function() {
    browserSync.init({
        server: "./dist"
    });

    gulp.watch("src/*.html", ['copy']);
    gulp.watch("src/styles/**/*.scss", ['styles']);
    gulp.watch("src/styles/**/*.scss").on('change', browserSync.reload);
});

// Styles
gulp.task('styles', function() {
  return sass('src/styles/main.scss', { style: 'expanded' })
    .pipe(autoprefixer('last 2 version'))
    .pipe(gulp.dest('dist/styles'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(cssnano())
    .pipe(gulp.dest('dist/styles'))
    .pipe(notify({ message: 'Styles task complete' }));
});

// Clean
gulp.task('clean', function() {
  return del(['dist/styles', 'dist/scripts', 'dist/images', 'dist/*.html']);
});

gulp.task('copy', function () {
    gulp.src('./src/*.html')
        .pipe(gulp.dest('./dist/'))
        .pipe(notify({ message: 'Html files have been copied' }));;
});

// Default task
gulp.task('default', ['clean', 'copy', 'serve'], function() {
  gulp.start('styles');
});
