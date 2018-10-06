'use strict'

const gulp = require('gulp');
const babel = require('gulp-babel');
const bust = require('gulp-cache-bust');

const plumber = require('gulp-plumber'),
	pug = require('gulp-pug'),
	gulpPugBeautify = require('gulp-pug-beautify'),
	htmlmin = require('gulp-htmlmin'),
	bs = require('browser-sync').create(),
	gulpsass = require('gulp-sass'),
	autoprefixer = require('gulp-autoprefixer'),
	cleanCss = require('gulp-clean-css'),
	sourcemaps = require('gulp-sourcemaps'),
	concat = require('gulp-concat'),
	jshint = require('gulp-jshint'),
	uglify = require('gulp-uglify'),
	imagemin = require('gulp-imagemin')

let onError = function (err) {
	console.log('Se ha producido un error: ', err.message);
	this.emit('end');
}

// 1°Toma cualquier archivo pug, lo pasa a html, lo minifica y crea un archivo html en la raíz si este no existe.

gulp.task('pug2html', function buildHTML() {
	gulp.src('./src/pug/html/*.pug')
		.pipe(pug({
			pretty: true
		}))
		.pipe(gulpPugBeautify({ omit_empty: true }))
		//.pipe(htmlmin({ collapseWhitespace: true })) //Activar para minificar
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
gulp.task('sass', function () {
	return gulp.src('./src/scss/styles.scss')
		.pipe(plumber({ errorHandler: onError }))
		// Iniciamos el trabajo con sourcemaps
		.pipe(sourcemaps.init())
		.pipe(gulpsass())
		.pipe(autoprefixer('last 2 versions'))
		.pipe(gulp.dest('./public/css'))
		//.pipe(cleanCss({ keepSpecialComments: 1 }))
		// Escribir los sourcemaps
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest('./public/css'))
		.pipe(bs.stream())
});

// 4° Vigila los posibles errores en js

gulp.task('lint', function () {
	return gulp.src('./src/js/activos/*.js')
		.pipe(jshint())
});

// 5° Toma los archivos js activos, los pasa por babel, avisa posibles errores, concatena los archivos, los minifica y los envía a la carpeta public

gulp.task('javascript', ['lint'], function () {
	//Para que los tome todos se usa ** si usara uno solo * tomaría cualquiera
	gulp.src('./src/js/activos/**.js')
		.pipe(plumber({ errorHandler: onError }))
		.pipe(babel({
			presets: ['@babel/env']
		}))
		.pipe(concat('all.min.js'))
		.pipe(uglify())		
		.pipe(gulp.dest('./public/js'));
});

// 6° Toma todas la imagenes, las optimiza y las envía a la carpeta public

gulp.task('imagemin', function () {
	return gulp.src('./src/img/*.*')
		.pipe(plumber({ errorHandler: onError }))
		.pipe(imagemin({
			progressive: true,
			interlaced: true
		}))
		.pipe(gulp.dest('./public/img'));
});

// 7°Inicia el servidor en la carpeta public, observa y actualiza automaticamente los cambios realizados en los archivos; styles.scss, *.pug, *.js y *.html. Además mantiene las tareas programadas actualizandolas automaticamente.
gulp.task('server', function () {

	bs.init({server: "./public"})

	gulp.watch('./src/pug/*/*.pug', ['pug2html']).on("change", bs.reload)
	gulp.watch('./src/scss/*/*.scss', ['sass', 'cache']).on("change", bs.reload)
	gulp.watch('./src/js/activos/*.js', ['javascript', 'cache']).on("change", bs.reload)
	gulp.watch('./src/img/*.*', ['imagemin']).on("change", bs.reload)
})

// 8° Pone en ejecución toda la programación al comando gulp por consola

gulp.task('default', ['pug2html', 'sass', 'javascript', 'imagemin', 'server'], function () {});
