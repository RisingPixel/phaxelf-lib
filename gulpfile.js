var del = require('del');
var gulp = require('gulp');
var path = require('path');
var argv = require('yargs').argv;
var gutil = require('gulp-util');
var jsdoc = require('gulp-jsdoc3');
var source = require('vinyl-source-stream');
var exec = require('child_process').exec;
var buffer = require('gulp-buffer');
// var uglify = require('gulp-uglify');
var gulpif = require('gulp-if');
var exorcist = require('exorcist');
var babelify = require('babelify');
var browserify = require('browserify');
var browserSync = require('browser-sync');

/**
 * Using different folders/file names? Change these constants:
 */
var DOCS_PATH = './docs/gen';
var BUILD_PATH = './build';
var SCRIPTS_PATH = BUILD_PATH;
var SOURCE_PATH = './src';
var STATIC_PATH = './static';
var ENTRY_FILE = SOURCE_PATH + '/index.js';
var OUTPUT_FILE = 'phaxelf.module.js';

var keepFiles = false;

/**
 * Simple way to check for development/production mode.
 */
function isProduction() {
  return argv.production;
}

/**
 * Logs the current build mode on the console.
 */
function logBuildMode() {

  if (isProduction()) {
    gutil.log(gutil.colors.green('Running production build...'));
  } else {
    gutil.log(gutil.colors.yellow('Running development build...'));
  }

}

/**
 * Deletes all content inside the './build' folder.
 * If 'keepFiles' is true, no files will be deleted. This is a dirty workaround since we can't have
 * optional task dependencies :(
 * Note: keepFiles is set to true by gulp.watch (see serve()) and reseted here to avoid conflicts.
 */
function cleanBuild() {
  if (!keepFiles) {
    del(['docs/**/*.*']);
    del(['build/**/*.*']);
  } else {
    keepFiles = false;
  }
}

/**
 * Copies the content of the './static' folder into the '/build' folder.
 * Check out README.md for more info on the '/static' folder.
 */
function copyStatic() {
  return gulp.src(STATIC_PATH + '/**/*')
    .pipe(gulp.dest(BUILD_PATH));
}

/**
 * Transforms ES2015 code into ES5 code.
 * Optionally: Creates a sourcemap file 'game.js.map' for debugging.
 *
 * In order to avoid copying Phaser and Static files on each build,
 * I've abstracted the build logic into a separate function. This way
 * two different tasks (build and fastBuild) can use the same logic
 * but have different task dependencies.
 */
function build(cb) {
  logBuildMode();

  var options = {
    continueOnError: false, // default = false, true means don't emit error event
    pipeStdout: false, // default = false, true means stdout is written to file.contents
    customTemplatingThing: "test" // content passed to lodash.template()
  };
  var reportOptions = {
    err: true, // default = true, false means don't write err
    stderr: true, // default = true, false means don't write stderr
    stdout: true // default = true, false means don't write stdout
  }
  exec('npm run build', function (err, stdout, stderr) {
    console.log(stderr);
    cb(err);
  });

  // return gulp.src(SOURCE_PATH + '/**/*.js')
  //   .pipe(exec('npm run build', options))
  //   .pipe(exec.reporter(reportOptions));
}

/**
 * Starts the Browsersync server.
 * Watches for file changes in the 'src' folder.
 */
function serve() {

  var options = {
    server: {
      baseDir: DOCS_PATH
    },
    open: false // Change it to true if you wish to allow Browsersync to open a browser window.
  };

  browserSync(options);

  // Watches for changes in files inside the './src' folder.
  gulp.watch(SOURCE_PATH + '/**/*.js', ['watch-docs', 'watch-js']);
  gulp.watch('./README.md', ['watch-docs']);
}

function docs(cb) {
  gulp.src(['README.md', SOURCE_PATH + '/**/*.js'], { read: false })
    .pipe(jsdoc(cb));
}


gulp.task('cleanBuild', cleanBuild);
gulp.task('build', ['cleanBuild'], build);
gulp.task('docs', docs);
gulp.task('serve', ['docs', 'build'], serve);
gulp.task('watch-docs', ['docs'], browserSync.reload); // Rebuilds and reloads the project when executed.
gulp.task('watch-js', ['build'], browserSync.reload); // Rebuilds and reloads the project when executed.

/**
 * The tasks are executed in the following order:
 * 'cleanBuild' -> 'copyStatic' -> 'copyPhaser' -> 'build' -> 'serve'
 *
 * Read more about task dependencies in Gulp:
 * https://medium.com/@dave_lunny/task-dependencies-in-gulp-b885c1ab48f0
 */
gulp.task('default', ['serve']);
