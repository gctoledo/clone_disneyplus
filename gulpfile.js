const gulp = require('gulp'); //importa o gulp
const sass = require('gulp-sass')(require('sass')); //importa sass e gulp-sass
const strip = require('gulp-strip-comments'); //importa plugin
const imagemin = require('gulp-imagemin');
const uglify = require('gulp-uglify');

function styles() { //transforma scss em css e comprime o arquivo
    return gulp.src('./src/styles/*.scss')
    .pipe(sass({outputStyle: 'compressed'}))
    .pipe(gulp.dest('./dist/css'));
}

function images() { //minifica as imagens
    return gulp.src('./src/images/**/*')
    .pipe(imagemin())
    .pipe(gulp.dest('./dist/images'));
}

function removeComments() { //remove os comentarios
    return gulp.src('./comments/scripts/*.js')
    .pipe(strip())
    .pipe(gulp.dest('./src/scripts'));
}

function scripts() {
    return gulp.src('./src/scripts/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('./dist/js'));
}

exports.default = gulp.parallel(styles, images, scripts);
exports.removeComments = removeComments;
exports.watch = function() {
    gulp.watch('./src/styles/*.scss', gulp.parallel(styles));
    gulp.watch('./src/scripts/*.js', gulp.parallel(scripts));
}