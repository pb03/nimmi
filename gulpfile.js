var gulp = require('gulp'),

  // Load gulp plugins
  connect = require('gulp-connect'),
  concat       = require('gulp-concat'),
  sass         = require('gulp-sass'),

  // Paths for source files
  paths = {
    html: [
      '*.html'
    ],
    scss: [
      // Include settings - order is important
      'assets/scss/settings/vars.scss',
      'assets/scss/settings/reset.scss',

      // Include all other styles
      'assets/scss/ui/*.scss',
      'assets/scss/ui/**/*.scss',
      'assets/scss/ui/**/**/*.scss'
    ],
    js: [
      'assets/js/*.js',
      'assets/js/**/*.js',
    ]
  };

/**
 * Concatinate and compress SCSS
 */
gulp.task('sass', function() {
  return gulp.src(paths.scss)
    .pipe(concat('main.css'))
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('dist/'));
});

/**
 * Concatinate and uglify JS
 */
gulp.task('js', function() {
  return gulp.src(paths.js)
    .pipe(concat('main.js'))
    .pipe(gulp.dest('dist/'))
    .pipe(connect.reload());
});

gulp.task('connect', function() {
  connect.server({ https: true });
});

/**
 * Default task, watch changes
 */
gulp.task('default', ['sass', 'js', 'connect'], function() {
  gulp.watch(paths.scss, ['sass']);
  gulp.watch(paths.js, ['js']);
});
