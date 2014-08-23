var gulp = require('gulp'),
    stylus = require('gulp-stylus'),
    uglify = require('gulp-uglify'),
    csscomb = require('gulp-csscomb'),
    cssmin = require('gulp-csso'),
    rename = require('gulp-rename'),
    livereload = require('gulp-livereload'),
    react = require('gulp-react');

var paths = {
    scripts: './src/js/*.js',
    styles: './src/stylus/**.styl',
    jsx: './src/js/jsx/*.jsx'
};

gulp.task('uglify', function () {
    return gulp.src(paths.scripts)
        .pipe(uglify({mangle: true, compress: true}))
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('./assets/js'))
        .pipe(livereload());
});

gulp.task('stylus', function () {
    return gulp.src('./src/stylus/style.styl')
        .pipe(stylus({use: ['nib']}))
        .pipe(csscomb())
        .pipe(gulp.dest('./assets/css'))
        .pipe(cssmin())
        .pipe(rename({
            basename: 'style', 
            suffix: '.min', 
            ext: '.css'
        }))
        .pipe(gulp.dest('./assets/css'))
        .pipe(livereload());
});

gulp.task('jsx', function () {
    return gulp.src(paths.jsx)
        .pipe(react())
        .pipe(gulp.dest('./assets/js/components/'))
        .pipe(livereload());
});

gulp.task('watch', function() {
    gulp.watch('./*.html').on('change', function (file) {
        server.changed(file.path);
    });
    gulp.watch(paths.scripts, ['uglify']);
    gulp.watch(paths.styles, ['stylus']);
    gulp.watch(paths.jsx, ['jsx']);
    var server = livereload();
});

gulp.task('default', ['watch']);