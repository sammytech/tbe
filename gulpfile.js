var browserSync       = require('browser-sync');
var nunjucksRender = require('gulp-nunjucks-render');
var gulp = require('gulp');

gulp.task('serve', function() {
    console.log('running server');
    browserSync({
        server: {
            baseDir: 'app/dist'
        }
	//proxy: "localhost/tbe",
	//serveStatic: ['app/dist']
    });
});

// writing up the gulp nunjucks task
gulp.task('nunjucks', function() {
  console.log('nunjucking');
 
  // configuring the templates folder for nunjucks
  nunjucksRender.nunjucks.configure(['app/templates/']);
 
  // get the pages files
  return gulp.src('app/pages/**/*.+(html|nunjucks|njk)')
    .pipe(nunjucksRender({
      path: ['app/templates']
    }))
    .pipe(gulp.dest('app/dist'))
});

gulp.task('watch', ['nunjucks', 'serve'], function () {
    gulp.watch("app/pages/**/*.+(html|nunjucks|njk)", ['nunjucks']);
    gulp.watch("app/templates/**/*.+(html|nunjucks|njk)", ['nunjucks']);
    gulp.watch("app/dist/css/*.css").on('change', browserSync.reload);
    gulp.watch("app/dist/*.html").on('change', browserSync.reload);
});
 
//default task to be run with gulp
gulp.task('default', ['serve']);

// gulp.task('nunjucks', function() {
//   // Gets .html and .nunjucks files in pages
//   return gulp.src('app/pages/**/*.+(html|nunjucks|njk)')
//   // Renders template with nunjucks
//   .pipe(nunjucksRender({
//       path: ['app/templates']
//     }))
//   // output files in app folder
//   .pipe(gulp.dest('app'))
// });
