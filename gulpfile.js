const gulp = require("gulp");
const imagemin = require("gulp-imagemin");
const gulpIgnore = require("gulp-ignore");
const terser = require("gulp-terser");
const sourcemaps = require("gulp-sourcemaps");
const postcss = require("gulp-postcss");
const cssnano = require("cssnano");
const autoprefixer = require("autoprefixer");
const del = require("del");
const concat = require("gulp-concat");
const { src, series, parallel, dest, watch } = gulp;

const hbsPath = "./**/*.hbs";
const imgPath = "./**/*+(png|jpg|gif)";
const jsPath = "./**/*.js";
const cssPath = "./**/*.css";

const hbsTask = (done) => {
  src([hbsPath, "!./node_modules/**"]).pipe(gulp.dest("./dist/"));
  done();
};

const imgTask = (done) => {
  src([imgPath, "!./node_modules/**"])
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
      ])
    )
    .pipe(gulp.dest("./dist/"));
  done();
};

const jsTask = (done) => {
  src([
    jsPath,
    "!./node_modules/**",
    "!./gulpfile.js",
    "!./**/*.test.js",
    "!./**/__test__*/**/*",
    "!./github-actions-reporter.js",
    "!./jest.config.js",
  ])
    .pipe(sourcemaps.init())
    .pipe(terser())
    .pipe(gulpIgnore.exclude("./gulpfile.js"))
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest("./dist/"));
  done();
};

const cssTask = (done) => {
  src([cssPath, "!./node_modules/**", "!./public/css/bootstrap.css"])
    .pipe(sourcemaps.init())
    .pipe(concat("styles.css"))
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(sourcemaps.write("."))
    .pipe(dest("./dist/public/css"));
  done();
};

const bootsrapAndStyleTask = (done) => {
  src([cssPath, "./**/bootstrap.css", "./**/style.css", "!./node_modules/**"])
    .pipe(sourcemaps.init())
    .pipe(concat("member-and-contact.css"))
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(sourcemaps.write("."))
    .pipe(dest("./dist/public/css"));
  done();
};

const jsonTask = (done) => {
  src("./*.json").pipe(dest(`dist/`));
  done();
};

const cleanUp = (done) => {
  del.sync("dist");
  done();
};

exports.clean = cleanUp; 

exports.default = series(
  parallel(hbsTask, imgTask, jsTask, bootsrapAndStyleTask, cssTask, jsonTask)
);
