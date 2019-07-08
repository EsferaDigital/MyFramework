'use strict'

import {watch, series, parallel, src, task, dest} from 'gulp';
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

const reload = browserSync.reload
const server = browserSync.create();
const imageminOptions = {
  progressive: true,
  optimizationLevel: 3,
  interlaced: true,
  svgPlugins: [{removeViewBox: false}]
}

let onError = err =>{
  console.log('Se ha producido un error: ', err.message);
  this.emit('end');
}

// 1°Toma cualquier archivo pug, lo pasa a html, lo minifica y crea un archivo html en la raíz si este no existe.

function html(done){
  src('./src/pug/paginas/*.pug')
    .pipe(pug({
      pretty: true
    }))
    .pipe(gulpPugBeautify({ omit_empty: true }))
    .pipe(htmlmin({ collapseWhitespace: true })) //Activar para minificar
    .pipe(dest('./public/'));
  done()
}

// 2° Añade una firma temporal al css y al js para que el navegador los reconozca como archivos nuevos cuando hagamos cambios
function cache(done){
  src('./public/**/*.html')
    .pipe(bust({
        type: 'timestamp'
    }))
    .pipe(dest('./public'));
  done()
};

//3° Toma los archivos scss, les pone prefijos, les borra los comentarios, crea el sourcemaps, avisa errores, los pasa a css, minifica el css y lo envia a la carpeta public
function sass(done){
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
    .pipe(server.stream())
  done()
};

// 4° Vigila los posibles errores en js

function lint(done){
  src('./src/js/**/*.js')
    .pipe(jshint())
  done()
};

// 5° Toma el archivo index.js, lo pasa por babel, avisa posibles errores, crea un archivo js, lo minifica, lo envía a la carpeta public y crea un archivo maps para ese archivo. Es importante crear un archivo para cada página, para ello, basta editar el index.js y cambiar el nombre del archivo resultante en esta tarea

function js(done){
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
    .pipe(reload({stream: true}))
  done()
};

// 6° Toma todas la imagenes, las optimiza y las envía a la carpeta public

function img(done){
  src('./src/img/*.*')
    .pipe(plumber({ errorHandler: onError }))
    .pipe(imagemin(imageminOptions))
    .pipe(dest('./public/img'));
  done()
};

// 7°Inicia el servidor en la carpeta public, observa y actualiza automaticamente los cambios realizados en los archivos; styles.scss, *.pug, *.js y *.html. Además mantiene las tareas programadas actualizandolas automaticamente.
function servidor(done){
  server.init({
    server: {
      baseDir: "./public"
    }
  });
  done()
}

function watch_files(){
  watch('./src/pug/*/*.pug', series(html, reload))
  watch('./src/scss/*/*.scss', series(sass, cache, reload))
  watch('./src/js/*/*.js', series(js, cache, reload))
  watch('./src/img/*.*', series(img, reload))
}

// Guardamos en el objeto gulp task nuestras funciones
task("html", html)
task("cache", cache)
task("sass", sass)
task("lint", lint)
task("js", js)
task("img", img)
task("servidor", servidor)
task("watch_files", series(watch_files, servidor))

// 8° Pone en ejecución toda la programación al comando gulp por consola

task('default', parallel(html, cache, sass,lint, js, servidor, watch_files))
