'use strict';

/*===========================================================================
Modules
===========================================================================*/

import gulp from 'gulp';
import browserSync from 'browser-sync';
import webpack from 'webpack-stream';
import minify from 'gulp-babel-minify';
import concat from 'gulp-concat';
import clean from 'gulp-clean';
import runSequence from 'run-sequence';

const reload = browserSync.reload;
let serverRunning = false;

/*===========================================================================
Dirs
===========================================================================*/

const paths = {
  scripts: './app/es6',
  dist: './dist',
  tmp: './.tmp',
}

/*===========================================================================
Browser Sync
===========================================================================*/

gulp.task('serve', () => {
  if (!serverRunning) {
    browserSync.init({
      notify: false,
      logPrefix: 'miniCanvas',
      scrollElementMapping: ['main', '.mdl-layout'],
      https: false,
      server: ['./'],
      port: 8080,
      ui: {
        port: 8081,
        weinre: {
          port: 9081
        }
      }
    });
  } else {
    reload;
  }
});

/*===========================================================================
Webpack
===========================================================================*/
gulp.task('webpack', () => {
  gulp.src([`${paths.scripts}/*`])
  .pipe(webpack({
    entry: {
      main: './app/es6/imports.js'
    },
    output: {
      filename: 'miniCanvas.min.js'
    },
    module: {
      rules: [
        {
          exclude: /(node_modules)/,
        }
      ]
    }
  }))
  .pipe(clean())
  .pipe(gulp.dest(paths.tmp))
});

/*===========================================================================
Minify
===========================================================================*/

gulp.task('minify', () =>
  gulp.src(`${paths.scripts}/*`)
    .pipe(minify({
      mangle: {
        keepClassName: true
      }
    }))
    .pipe(concat('miniCanvas.min.js'))
    .pipe(gulp.dest(paths.tmp))
);

/*===========================================================================
Dist
===========================================================================*/

gulp.task('dist', () =>
  gulp.src(`${paths.tmp}/*`)
    .pipe(gulp.dest('./dist'))
);

/*===========================================================================
Clean
===========================================================================*/

gulp.task('clean', () =>
  gulp.src(`${paths.tmp}/`)
    .pipe(clean())
);

/*===========================================================================
Default
===========================================================================*/

gulp.task('default', ['minify'], cb => {
  setTimeout(() => {runSequence(['dist', 'serve', 'clean'])}, 1000);
  cb
});