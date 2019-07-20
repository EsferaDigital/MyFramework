'use strict'

import {watch, series, parallel, src, dest} from 'gulp';
import bust from 'gulp-cache-bust';
import plumber from 'gulp-plumber';
import pug from 'gulp-pug';
import gulpPugBeautify from 'gulp-pug-beautify';
import htmlmin from 'gulp-htmlmin';
import browserSync from 'browser-sync';
import gulpsass from 'gulp-sass';
import autoprefixer from 'gulp-autoprefixer';
import browserify from 'browserify';
import jsmin from 'gulp-jsmin';
import cleanCss from 'gulp-clean-css';
import sourcemaps from 'gulp-sourcemaps';
import jshint from 'gulp-jshint';
import imagemin from 'gulp-imagemin';
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';

const servidor = browserSync.create();
const imageminOptions = {
  progressive: true,
  optimizationLevel: 3,
  interlaced: true,
  svgPlugins: [{removeViewBox: false}]
}

function onError(err){
  console.log('Se ha producido un error: ', err.message);
  this.emit('end');
}

// 1°Toma cualquier archivo pug, lo pasa a html, lo minifica y crea un archivo html en la raíz si este no existe.

function html(cb){
  src('./src/pug/paginas/*.pug')
    .pipe(pug({
      pretty: true
    }))
    .pipe(gulpPugBeautify({ omit_empty: true }))
    .pipe(htmlmin({ collapseWhitespace: true })) //Activar para minificar
    .pipe(dest('./public/'))
    .pipe(servidor.stream())
  cb()
}

// 2° Añade una firma temporal al css y al js para que el navegador los reconozca como archivos nuevos cuando hagamos cambios
function cache(cb){
  src('./public/**/*.html')
    .pipe(bust({
        type: 'timestamp'
    }))
    .pipe(dest('./public'));
  cb()
}

// 3° Toma los archivos scss, les pone prefijos, les borra los comentarios, crea el sourcemaps, avisa errores, los pasa a css, minifica el css y lo envia a la carpeta public

function sass(cb){
  src('./src/scss/styles.scss')
    .pipe(plumber({ errorHandler: onError }))
    // Iniciamos el trabajo con sourcemaps
    .pipe(sourcemaps.init())
    .pipe(gulpsass())
    .pipe(autoprefixer('last 2 versions'))
    .pipe(dest('./public/css'))
    .pipe(cleanCss({ keepSpecialComments: 1 }))
    // Escribir los sourcemaps
    .pipe(sourcemaps.write('.'))
    .pipe(dest('./public/css'))
    .pipe(servidor.stream())
  cb()
}

// 4° Vigila los posibles errores en js

function lint(){
  src('./src/js/**/*.js')
    .pipe(jshint())
}

// 5° Toma el archivo index.js, lo pasa por babel, avisa posibles errores, crea un archivo js, lo minifica, lo envía a la carpeta public y crea un archivo maps para ese archivo. Es importante crear un archivo para cada página, para ello, basta editar el index.js y cambiar el nombre del archivo resultante en esta tarea

function js(cb){
  browserify('./src/js/index.js')
    .transform('babelify', {presets: ["@babel/preset-env"]})
    .bundle()
    .on('error', err => console.log(err.message))
    .pipe(source('./public/js/inicio.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(sourcemaps.write('./'))
    .pipe(jsmin())
    .pipe(dest('./'))
    .pipe(servidor.stream())
  cb()
}

// 6° Toma todas la imagenes, las optimiza y las envía a la carpeta public

function img(cb){
  src('./src/img/*.*')
    .pipe(plumber({ errorHandler: onError }))
    .pipe(imagemin(imageminOptions))
    .pipe(dest('./public/img'));
  cb()
}

// 7° Levanta un servidor y abre una pestaña con el proyecto, vigila los cambios e inyecta los cambios en los archivos correspondientes
function watchFiles(){
  servidor.init({
    server: {
      baseDir: "./public"
    }
  })
  watch('./src/pug/*/*.pug', html)
  watch('./src/scss/*/*.scss', series(sass, cache))
  watch('./src/js/index.js', series(js, cache))
}


exports.html = html
exports.cache = cache
exports.sass = sass
exports.js = js
exports.img = img
exports.watchFiles = watchFiles
exports.default = series(parallel(html, sass, js), watchFiles)
