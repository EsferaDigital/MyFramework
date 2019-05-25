'use strict'

import gulp from 'gulp';
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

let onError = function (err) {
  console.log('Se ha producido un error: ', err.message);
  this.emit('end');
}

// 1°Toma cualquier archivo pug, lo pasa a html, lo minifica y crea un archivo html en la raíz si este no existe.

gulp.task('pug2html', function buildHTML() {
  gulp.src('./src/pug/paginas/*.pug')
    .pipe(pug({
      pretty: true
    }))
    .pipe(gulpPugBeautify({ omit_empty: true }))
    .pipe(htmlmin({ collapseWhitespace: true })) //Activar para minificar
    .pipe(gulp.dest('./public/'));
});

// 2° Añade una firma temporal al css y al js para que el navegador los reconozca como archivos nuevos cuando hagamos cambios
gulp.task('cache', () => {
	gulp.src('./public/**/*.html')
    .pipe(bust({
        type: 'timestamp'
    }))
    .pipe(gulp.dest('./public'));
});

//3° Toma los archivos scss, les pone prefijos, les borra los comentarios, crea el sourcemaps, avisa errores, los pasa a css, minifica el css y lo envia a la carpeta public
gulp.task('sass', () => {
	return gulp.src('./src/scss/styles.scss')
		.pipe(plumber({ errorHandler: onError }))
		// Iniciamos el trabajo con sourcemaps
		.pipe(sourcemaps.init())
		.pipe(gulpsass())
		.pipe(autoprefixer('last 2 versions'))
		.pipe(gulp.dest('./public/css'))
		.pipe(cleanCss({ keepSpecialComments: 1 }))
		// Escribir los sourcemaps
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest('./public/css'))
		.pipe(server.stream())
});

// 4° Vigila los posibles errores en js

gulp.task('lint', () => {
  return gulp.src('./src/js/**/*.js')
    .pipe(jshint())
});

// 5° Toma el archivo index.js, lo pasa por babel, avisa posibles errores, crea un archivo js, lo minifica, lo envía a la carpeta public y crea un archivo maps para ese archivo. Es importante crear un archivo para cada página, para ello, basta editar el index.js y cambiar el nombre del archivo resultante en esta tarea

gulp.task('js', () => {
  browserify('./src/js/index.js')
    .transform('babelify', {presets: ["@babel/preset-env"]})
    .bundle()
    .on('error', err => console.log(err.message))
    .pipe(source('./public/js/inicio.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(sourcemaps.write('./'))
    .pipe(jsmin())
    .pipe(gulp.dest('./'))
    .pipe(reload({stream: true}))
});

// 6° Toma todas la imagenes, las optimiza y las envía a la carpeta public

gulp.task('img', function () {
  return gulp.src('./src/img/*.*')
    .pipe(plumber({ errorHandler: onError }))
    .pipe(imagemin(imageminOptions))
    .pipe(gulp.dest('./public/img'));
});

// 7°Inicia el servidor en la carpeta public, observa y actualiza automaticamente los cambios realizados en los archivos; styles.scss, *.pug, *.js y *.html. Además mantiene las tareas programadas actualizandolas automaticamente.
gulp.task('server', function () {
  server.init({
    server: {
      baseDir: "./public"
    }
  });

  gulp.watch('./src/pug/*/*.pug', ['pug2html']).on("change", server.reload)
  gulp.watch('./src/scss/*/*.scss', ['sass', 'cache']).on("change", server.reload)
  gulp.watch('./src/js/*/*.js', ['js', 'cache']).on("change", server.reload)
  gulp.watch('./src/img/*.*', ['img']).on("change", server.reload)
});

// 8° Pone en ejecución toda la programación al comando gulp por consola

gulp.task('default', ['pug2html', 'sass', 'server'], function () {});
