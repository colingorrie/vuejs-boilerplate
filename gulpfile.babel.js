"use strict";

import aliasify from "aliasify";
import autoprefixer from "autoprefixer";
import babelify from "babelify";
import browserify from "browserify";
import envify from "envify";
import promise from "es6-promise";
import gulp from "gulp";
import eslint from "gulp-eslint";
import livereload from "gulp-livereload";
import rename from "gulp-rename";
import sourcemaps from "gulp-sourcemaps";
import uglify from "gulp-uglify";
import gutil from "gulp-util";
import merge from "utils-merge";
import buffer from "vinyl-buffer";
import source from "vinyl-source-stream";
import vueify from "vueify";
import watchify from "watchify";

promise.polyfill();

const config = {
  env: {
    production: !!gutil.env.production
  },
  js: {
    src: "./src/index.js",
    destDir: "../flask-boilerplate/boilerplate/static/js",  // meant for use alongside https://github.com/colingorrie/flask-boilerplate
    destFile: "app.js",
    mapDir: "./"
  },
  aliasify: {
    aliases: {
      vue: "vue/dist/vue"
    }
  },
  babelify: {
    presets: ["es2015", "stage-2"]
  },
  vueify: {
    postcss: [autoprefixer]
  }
};

function lintJS() {
  return gulp.src(["src/**/*.js", "src/**/*.vue"])
      .pipe(eslint())
      .pipe(eslint.formatEach())
      .pipe(eslint.failAfterError());
}

// reuse common bundling options
function bundle(bundler) {
  // add options to base bundler
  return bundler.bundle()
         .on("error", (err) => {
           gutil.log("Browserify error:", gutil.colors.red(err.message));
         })
         .pipe(source(config.js.src))
         .pipe(buffer())
         .pipe(rename(config.js.destFile))
         .pipe(sourcemaps.init({ loadMaps: true }))
         .pipe(config.env.production ? uglify() : gutil.noop())
         .pipe(sourcemaps.write(config.js.mapDir))
         .pipe(gulp.dest(config.js.destDir))
         .pipe(livereload());
}

gulp.task("build", ["lint:js"], () => {
  const bundler = browserify(config.js.src, { debug: !config.env.production })
    .transform(envify, { NODE_ENV: config.env.production ? "production" : "development" })
    .transform(vueify, config.vueify)
    .transform(babelify, config.babelify)
    .transform(aliasify, config.aliasify);

  return bundle(bundler);
});

gulp.task("watch", ["lint:js"], () => {
  livereload.listen();
  const args = merge(watchify.args, { debug: !config.env.production });

  const bundler = browserify(config.js.src, args)
    .plugin(watchify)
    .transform(envify, { NODE_ENV: config.env.production ? "production" : "development" })
    .transform(vueify, config.vueify)
    .transform(babelify, config.babelify)
    .transform(aliasify, config.aliasify);

  bundle(bundler);  // run bundle for the first time

  bundler.on("update", () => {
    bundle(bundler);  // chain other options
  });
});

gulp.task("lint:js", lintJS);
