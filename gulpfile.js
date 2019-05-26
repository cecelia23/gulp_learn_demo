const gulp = require('gulp');
const less = require('gulp-less');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const del = require('del');

gulp.task('clean', (done) => {
  del.sync('build');
  done();
});

gulp.task('less', async () => {
   await gulp.src('src/style/**/*.less')
    .pipe(less())    // 将less转成css
    .pipe(autoprefixer({
      browsers: ['last 2 versions', 'Firefox > 20'],
      cascade: false
    }))
    .pipe(cleanCSS())   // 进行css压缩
    .pipe(gulp.dest('build'));
});
// 必须指定返回
gulp.task('default', gulp.series('clean', 'less', () => {
  return new Promise((resolve, reject) => {
    console.log('done!');
    resolve();
  })
}));

gulp.task('watch', (cb) => {
  const watcher = gulp.watch('src/**/*', gulp.series('default'));
  watcher.on('change', (path, stats) => {
    console.log(`File ${path} was changed`);
  });
  watcher.on('add', (path, stats) => {
    console.log(`File ${path} was added`);
  });

  cb();
});

