const gulp = require('gulp');
const zip = require('gulp-zip');

gulp.task('zip', function() {
      return gulp.src(['./**', '!.*', '!*.zip', '!*.tgz'])
            .pipe(zip('install-assistant.zip'))
            .pipe(gulp.dest('./'));
});

gulp.task('default', ['zip']);
