//
// Build Processing Pipeline
//
var gulp       = require("gulp");
var ts         = require("gulp-typescript");
var sourcemaps = require('gulp-sourcemaps');

var GLOB_HTML = "src/**/*.html";
var GLOB_CSS  = "src/**/*.css";
var GLOB_SVG  = "src/**/*.svg";
var GLOB_PNG  = "src/**/*.png";
var GLOB_TS   = "src/**/*.ts";

var TASK_HTML = "copy-html";
var TASK_CSS  = "copy-css";
var TASK_SVG  = "copy-svg";
var TASK_PNG  = "copy-png";
var TASK_TS   = "transpile-typescript";
var TASK_ALL  = [TASK_HTML, TASK_CSS, TASK_SVG, TASK_PNG, TASK_TS];

var TASK_WATCH_HTML = "watch-html";
var TASK_WATCH_CSS  = "watch-css";
var TASK_WATCH_SVG  = "watch-svg"
var TASK_WATCH_PNG  = "watch-png"
var TASK_WATCH_TS   = "watch-typescript";
var TASK_WATCH_ALL  = [TASK_WATCH_HTML, TASK_WATCH_CSS, TASK_WATCH_SVG, TASK_WATCH_PNG, TASK_WATCH_TS];

var ts_config = ts.createProject("tsconfig.json");


function task_copy_html()
{
    return gulp.src(GLOB_HTML)
        .pipe(gulp.dest("dist"));
}

function task_copy_css()
{
    return gulp.src(GLOB_CSS)
        .pipe(gulp.dest("dist"));
}

function task_copy_svg()
{
    return gulp.src(GLOB_SVG)
        .pipe(gulp.dest("dist"))
}

function task_copy_png()
{
    return gulp.src(GLOB_PNG)
        .pipe(gulp.dest("dist"))
}

function task_transpile_typescript()
{
    return gulp.src(GLOB_TS)
        .pipe(sourcemaps.init()) // This means sourcemaps will be generated
        .pipe(ts_config())
        .pipe(sourcemaps.write(".", {includeContent: false, sourceRoot: "../src"})) // Now the sourcemaps are added to the .js file
        .pipe(gulp.dest("dist"));
}


task_copy_html.description            = "Copies HTML sources to dest/ folder";
task_copy_css.description             = "Copies CSS sources to dest/ folder";
task_copy_svg.description             = "Copies SVG sources to dest/ folder";
task_copy_png.description             = "Copies PNG sources to dest/ folder";
task_transpile_typescript.description = "Transpiles typescript sources to javascript at dest/ and adds sourcemaps";

gulp.task(TASK_HTML, task_copy_html);
gulp.task(TASK_CSS,  task_copy_css);
gulp.task(TASK_SVG,  task_copy_svg);
gulp.task(TASK_PNG,  task_copy_png);
gulp.task(TASK_TS,   task_transpile_typescript);

gulp.task("all", gulp.parallel(TASK_ALL));

gulp.task(TASK_WATCH_HTML, function(done) { gulp.watch(GLOB_HTML, {ignoreInitial: false}, task_copy_html);            done(); })
gulp.task(TASK_WATCH_CSS,  function(done) { gulp.watch(GLOB_CSS,  {ignoreInitial: false}, task_copy_css);             done(); })
gulp.task(TASK_WATCH_SVG,  function(done) { gulp.watch(GLOB_SVG,  {ignoreInitial: false}, task_copy_svg);             done(); })
gulp.task(TASK_WATCH_PNG,  function(done) { gulp.watch(GLOB_PNG,  {ignoreInitial: false}, task_copy_png);             done(); })
gulp.task(TASK_WATCH_TS,   function(done) { gulp.watch(GLOB_TS,   {ignoreInitial: false}, task_transpile_typescript); done(); })

gulp.task("watch", gulp.parallel(TASK_WATCH_ALL));
