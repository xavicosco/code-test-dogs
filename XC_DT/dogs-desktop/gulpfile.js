var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    sass = require('gulp-sass');
	rename = require("gulp-rename");
	minifyCSS = require('gulp-minify-css');
	
var paths = {
	scss: 'css/*.scss',
	css: ['css/*.css', '!css/*.min.css'],
	images: 'images/',
};

//cmd type 'gulp'
gulp.task('default', ['watch']);

gulp.task('uglify', function() {
    gulp.src('js/**/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('min_js'));
});

gulp.task('scss', function() {
    gulp.src(paths.scss)
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('css/'));
});

gulp.task('mincss', function() {
    gulp.src(paths.css)
        .pipe(minifyCSS())
		.pipe(rename({ suffix: '.min' }))
		.pipe(gulp.dest('./build/css/'))
});

//watch changing tasks: stylesheet scss and minify css
gulp.task('watch', function() {
    gulp.watch('css/*.scss', ['scss']);
    gulp.watch('css/*.css', ['mincss']);
});