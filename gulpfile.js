const gulp = require("gulp");
const imagemin = require("gulp-imagemin");
const concat = require("gulp-concat");
const terser = require("gulp-terser");
const sourcemaps = require("gulp-sourcemaps");
const postcss = require("gulp-postcss");
const cssnano = require("cssnano");
const autoprefixer = require("autoprefixer");
const { src, series, parallel, dest, watch } = gulp;

const viewsPaths = [
  "views",
  "views/members-area",
  "views/partials",
  "views/planets",
];

const imagePaths = [
  "public/images/Bg",
  "public/images/main",
  "public/images/planet-pages/earth",
  "public/images/planet-pages/jupiter",
  "public/images/planet-pages/mars",
  "public/images/planet-pages/mercury",
  "public/images/planet-pages/neptune",
  "public/images/planet-pages/pluto",
  "public/images/planet-pages/saturn",
  "public/images/planet-pages/uranus",
  "public/images/planet-pages/venus",
  "public/images/profile",
];

const jsPaths = ["controllers", "routes", "util", "public/lib/particlesjs"];

const cssPath = "public/css/*.css";
// copies hanlebar veiws
function copyHbs() {
  viewsPaths.map((views) => src(`${views}/*.hbs`).pipe(dest(`dist/${views}`)));
}

//copies Images
function imgTask() {
  imagePaths.map((images) =>
    src(`${images}/*`)
      .pipe(imagemin())
      .pipe(dest(`dist/${images}`))
  );
}

// minify js
function jsTask() {
  jsPaths.map((jsFolder) => {
    return src(`${jsFolder}/*.js`)
      .pipe(sourcemaps.init()) // writes an init function for before and after the other plugins
      .pipe(terser()) // minifies js
      .pipe(sourcemaps.write(".")) // writes source maps
      .pipe(dest(`dist/${jsFolder}`));
  });
}

function cssTask() {
  return src(cssPath)
    .pipe(sourcemaps.init())
    .pipe(postcss([autoprefixer(), cssnano()])) //not all plugins work with postcss only the ones mentioned in their documentation
    .pipe(sourcemaps.write("."))
    .pipe(dest("dist/public/css"));
}

function watchTask() {
  let jsPath = [];
  let viewPath = [];
  let imagePath = [];

  console.log(jsPath);
  jsPaths.map((js) => {
    jsPath.push(js);
  });
  viewsPaths.map((view) => {
    viewPath.push(view);
  });
  imagePaths.map((image) => {
    imagePath.push(image);
  });
  return watch(
    [...jsPath, ...imagePath, ...jsPath, cssPath],
    { interval: 1000 },
    parallel(copyHbs, imgTask, jsTask, cssTask)
  );
}

// use parallel to add more than one file to default
exports.copyHbs = copyHbs;
exports.imgTask = imgTask;
exports.cssTask = cssTask;
exports.jsTask = jsTask;
exports.default = series(
  parallel(copyHbs, imgTask, jsTask, cssTask),
  watchTask
);
