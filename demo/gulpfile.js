var gulp = require('gulp');

var server = require('gulp-webserver');

var scss = require('gulp-sass');

var concat = require('gulp-concat');

var minCss = require('gulp-clean-css');

var fs = require('fs');

var path = require('path')

gulp.task('server', function() {
    gulp.src('src')
        .pipe(server({
            port: 8080,
            middleware: function(req, res, next) {
                var url = require('url').parse(req.url);
                var pathname = url.pathname;
                pathname = pathname === '/' ? '/a.html' : pathname;
                if (pathname === '/favicon.ico') {
                    return false;
                }
                res.end(fs.readFileSync(path.join(__dirname, 'src', pathname)));
                // if (pathname === '/') {
                //     // console.log(path.join(__dirname, 'src', 'a.html'));

                // }else{

                // }
            }
        }))
});
gulp.task('scss', function() {
    gulp.src('./src/scss/*.scss')
        .pipe(scss())
        .pipe(concat('all.css'))
        .pipe(gulp.dest('src/css'))
});

gulp.task('watch', function() {
    gulp.watch('./src/scss/*.scss', ['scss'])
})

gulp.task('default', ['server', 'scss', 'watch'])