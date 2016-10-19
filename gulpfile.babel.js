import gulp from 'gulp';
import concat from 'gulp-concat';
import watchify from 'watchify';
import browserify from 'browserify';
import babelify from 'babelify';
import source from 'vinyl-source-stream';

gulp.task('buildJS', () => {
    const bundler = watchify(browserify({entries: './js/app.jsx', extensions: ['.jsx'], debug: true}));

    const makeABild = () => {
            console.log('recompiling');
            bundler
                .transform('babelify', {presets: ['es2015', 'react']})
                .bundle()
                .on('error', err => {
                    console.error(err);
                })
                .pipe(source('app.js'))
                .pipe(gulp.dest('./'));
    };

    makeABild();
    bundler.on('update', makeABild);
});

gulp.task('buildCSS', () => {
    gulp.src('./css/parts/*.css')
        .pipe(concat('poland_ball.css'))
        .pipe(gulp.dest('./css'))
});

gulp.task('watch', () => {
    gulp.watch('./css/parts/*.css', ['buildCSS'])
});

gulp.task('default', ['buildJS', 'buildCSS' ,'watch']);

