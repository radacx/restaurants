"use strict";
let gulp = require("gulp");
let sourcemaps = require("gulp-sourcemaps");
let typescript = require("gulp-typescript");
let runSequence = require("run-sequence");
let rimraf = require("rimraf");
let plumber = require("gulp-plumber");

const CLEAN_BUILD = "clean:build";
const COMPILE_TYPESCRIPT = "compile:typescript";
const BUILD = "build";

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
