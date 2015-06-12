var gulp = require('gulp'),
  sass = require('gulp-sass'),
  browserify = require('gulp-browserify'),
  concat = require('gulp-concat'),
  embedlr = require('gulp-embedlr'),
  refresh = require('gulp-livereload'),
  lrserver = require('tiny-lr')(),
  server = require('./server.js'),
  livereload = require('connect-livereload');
  
  var  livereloadport = 35729 || 3000, serverport = process.env.PORT;
 
 
//Task for sass using libsass through gulp-sass
gulp.task('sass', function(){
  gulp.src('client/sass/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('build'))
    .pipe(refresh(lrserver));
});
 
//Task for processing js with browserify
gulp.task('browserify', function(){
  gulp.src('client/js/*.js')
   .pipe(browserify())
   .pipe(concat('bundle.js'))
   .pipe(gulp.dest('build'))
   .pipe(refresh(lrserver));
 
});
 
//Task for moving html-files to the build-dir
//added as a convenience to make sure this gulpfile works without much modification
gulp.task('html', function(){
  gulp.src('client/*.html')
    .pipe(gulp.dest('build'))
    .pipe(refresh(lrserver));
});
 
//Convenience task for running a one-off build
gulp.task('build', function() {
  gulp.run('html', 'browserify', 'sass');
});
 
gulp.task('serve', function() {
  server.instance.start();
 
  //Set up your livereload server
  lrserver.listen(livereloadport);
});
 
gulp.task('watch', function() {
 
  //Add watching on sass-files
  gulp.watch('sass/*.scss', function() {
    gulp.run('sass');
  });
  
  //Add watching on js-files
  gulp.watch('client/js/*.js', function() {
    gulp.run('browserify');
  });
 
  //Add watching on html-files
  gulp.watch('client/*.html', function () {
    gulp.run('html');
  });
});
 
gulp.task('default', function () {
  gulp.run('build', 'serve', 'watch');
});