var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var useref = require('gulp-useref');
var uglify = require('gulp-uglify');
var gulpIf = require('gulp-if');
var cssnano = require('gulp-cssnano');
var del = require('del');
var runSequence = require('run-sequence');
var postcss = require('gulp-postcss');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var jshint = require("gulp-jshint");
var sassLint = require('gulp-sass-lint');




//Sass:
gulp.task('sass', function () {
    return gulp.src('app/scss/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))



        .pipe(sourcemaps.write())
        .pipe(autoprefixer()) // Auto vendor
        .pipe(gulp.dest('app/css'))

        .pipe(browserSync.reload({
            stream: true
        }));
});




// detecting errors and potential problems
gulp.task('jshint', function () {
    return gulp.src('app/js/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter())
        .pipe(browserSync.reload({ // Reloading with Browser Sync
            stream: true
        }));
});


// Lint scss:
gulp.task('sassLint', function () {
    return gulp.src('app/scss/**/*.s+(a|c)ss')
        .pipe(sassLint())
        .pipe(sassLint.format())
        .pipe(sassLint.failOnError())
});

// Minify js and css:
gulp.task('useref', function () {
    return gulp.src('app/*.html')
        .pipe(useref())
        .pipe(gulpIf('*.js', uglify()))
        // Minifies only if it's a CSS file
        .pipe(gulpIf('*.css', cssnano()))
        .pipe(gulp.dest('dist'))
});

// Server - BrowserSync:
gulp.task('browserSync', function () {
    browserSync.init({
        server: {
            baseDir: 'app'
        }
    })
});



// Clean folders from Files not used anymore:
gulp.task('clean:dist', function () {
    return del.sync('dist');
})

// watching files
gulp.task('watch', function () {
    gulp.watch('app/*.html', browserSync.reload);
    gulp.watch('app/scss/**/*.scss', ['sass']);
    gulp.watch('app/js/**/*.js', ['jshint']);
    gulp.watch('app/images/**/*', browserSync.reload);
})
// build:
gulp.task('build', function (callback) {
    runSequence('clean:dist', ['sass', 'useref'],
        callback
    )
})

// start Gulp for developping process:
gulp.task('default', function (callback) {
    runSequence(
        ['sass', 'jshint', 'browserSync', 'watch'],
        callback
    );

})
