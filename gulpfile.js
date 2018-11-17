var gulp = require('gulp'),

  // Load gulp plugins
  connect = require('gulp-connect'),
  concat       = require('gulp-concat'),
  sass         = require('gulp-sass');

/**
 * Concatinate and compress SCSS
 */
gulp.task('sass', function() {
  return gulp.src('./main.scss')
    .pipe(concat('main.css'))
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./'));
});

gulp.task('connect', function() {
  connect.server({ https: true });
});

/**
 * Default task
 */
gulp.task('default', ['sass', 'connect']);
