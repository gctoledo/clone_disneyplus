const gulp = require('gulp'); //importa o gulp
const sass = require('gulp-sass')(require('sass')); //importa sass e gulp-sass
const strip = require('gulp-strip-comments'); //importa plugin
const imagemin = require('gulp-imagemin');

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

exports.default = gulp.parallel(styles, images);
exports.removeComments = removeComments;
exports.watch = function() {
    gulp.watch('./src/styles/*.scss', gulp.parallel(styles))
}