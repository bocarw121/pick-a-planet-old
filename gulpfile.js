const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const gulpIgnore = require('gulp-ignore');
const terser = require('gulp-terser');
const sourcemaps = require('gulp-sourcemaps');
const postcss = require('gulp-postcss');
const cssnano = require('cssnano');
const autoprefixer = require('autoprefixer');
const del = require('del');
const { src, series, parallel, dest } = gulp;

const hbsPath = './**/*.hbs';
const imgPath = './**/*+(png|jpg|gif)';
const jsPath = './**/*.js';

const hbsTask = (done) => {
  src([hbsPath, '!./node_modules/**']).pipe(gulp.dest('./dist/'));
  done();
};

const imgTask = (done) => {
  src([imgPath, '!./node_modules/**'])
    .pipe(
      imagemin([
        imagemin.gifsicle({ interlaced: true }),
        imagemin.optipng({ optimizationLevel: 5 }),
        imagemin.svgo({
          plugins: [
            {
              removeViewBox: false,
              collapseGroups: true,
            },
          ],
        }),
      ]),
    )
    .pipe(gulp.dest('./dist/'));
  done();
};

const jsTask = (done) => {
  src([jsPath, '!./node_modules/**', '!./gulpfile.js'])
    .pipe(sourcemaps.init())
    .pipe(terser())
    .pipe(gulpIgnore.exclude('./gulpfile.js'))
    // .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./dist/'));
  done();
};

const cssTask = (done) => {
  src(['./public/css/styles.css', '!./node_modules/**'])
    .pipe(sourcemaps.init())
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(sourcemaps.write('.'))
    .pipe(dest('./dist/public/css'));
  done();
};

const materialUiTasks = (done) => {
  src(['./public/css/material-dashboard.*']).pipe(dest('./dist/public/css'));
  done();
};

const jsonTask = (done) => {
  src('./*.json').pipe(dest('dist/'));
  done();
};

const cleanUp = (done) => {
  del.sync('dist');
  done();
};

// prisma task
const prismaTask = (done) => {
  src('./prisma/schema.prisma').pipe(dest('dist/prisma'));
  done();
};

exports.clean = cleanUp;

exports.default = series(
  parallel(
    hbsTask,
    imgTask,
    jsTask,
    cssTask,
    materialUiTasks,
    jsonTask,
    prismaTask,
  ),
);
