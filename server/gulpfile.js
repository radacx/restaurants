"use strict";
let gulp = require("gulp");
let sourcemaps = require("gulp-sourcemaps");
let typescript = require("gulp-typescript");
let nodemon = require("gulp-nodemon");
let runSequence = require("run-sequence");
let rimraf = require("rimraf");
let plumber = require("gulp-plumber");

const CLEAN_BUILD = "clean:build";
const COMPILE_TYPESCRIPT = "compile:typescript";
const BUILD = "build";
const WATCH = "watch";

const TS_SRC_GLOB = "./src/**/*.ts";
const TS_GLOB = [TS_SRC_GLOB];

const tsProject = typescript.createProject("tsconfig.json");

// ###### CLEAN ######

// Removes the ./build directory with all its content.
gulp.task(CLEAN_BUILD, function(callback) {
    rimraf("./build", callback);
});

// ###### COMPILE ######

// Compiles all *.ts-files to *.js-files.
gulp.task(COMPILE_TYPESCRIPT, function() {
    return gulp.src(TS_GLOB, {base: "."})
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(tsProject())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest("./build"));
});

// Runs all required steps for the build in sequence.
gulp.task(BUILD, function(callback) {
    runSequence(CLEAN_BUILD, COMPILE_TYPESCRIPT, callback);
});

// ###### WATCH ######

// Runs the build task and starts the server every time changes are detected.
gulp.task(WATCH, [BUILD], function () {
    return nodemon({
        ext: "ts js json",
        script: "build/src/server.js",
        watch: ["src/*"],
        env: {"NODE_ENV": "development"},
        tasks: [BUILD]
    });
});
