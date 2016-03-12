var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var concat = require('gulp-concat');
var htmlhint = require('gulp-htmlhint');
var sass = require('gulp-sass');
var minifyCss = require('gulp-clean-css');
var rename = require('gulp-rename');
var sh = require('shelljs');
var es = require('event-stream');

var paths = {
  sass: ['./scss/**/*.scss'],
  partials: ['./www/js/extensions/directives/**/_*.html'],
  dest: ['./www/']
};

var pipes = {};
pipes.validatedPartials = function() {
  return gulp.src(paths.partials)
    .pipe(htmlhint({
      'doctype-first': false
    }))
    .pipe(htmlhint.reporter());
};
// pipes.builtPartials = function() {
//   return pipes.validatedPartials()
//     .pipe(gulp.dest(paths.dest+'views/'));
// };
pipes.builtStyles = function() {
  return gulp.src('./scss/ionic.app.scss')
    .pipe(sass())
    .on('error', sass.logError)
    .pipe(gulp.dest(paths.dest + 'css/'))
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({
      extname: '.min.css'
    }))
    .pipe(gulp.dest('./www/css/'));
};
pipes.builtApp = function() {
  return es.merge(pipes.validatedPartials(), pipes.builtStyles());
};

gulp.task('default', pipes.builtApp);

gulp.task('watch', function() {
  gulp.watch(paths.sass, function() {
    return pipes.builtStyles();
  });
});

gulp.task('install', ['git-check'], function() {
  return bower.commands.install()
    .on('log', function(data) {
      gutil.log('bower', gutil.colors.cyan(data.id), data.message);
    });
});

gulp.task('git-check', function(done) {
  if (!sh.which('git')) {
    console.log(
      '  ' + gutil.colors.red('Git is not installed.'),
      '\n  Git, the version control system, is required to download Ionic.',
      '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
      '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
    );
    process.exit(1);
  }
  done();
});
