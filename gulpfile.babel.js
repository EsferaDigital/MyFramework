'use strict'

import gulp from 'gulp';
import babel from 'gulp-babel';

const watch = require('gulp-watch'),
	plumber = require('gulp-plumber'),
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
	imagemin = require('gulp-imagemin'),
	notify = require('gulp-notify')

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
		.pipe(gulp.dest('./public/'))
})

//2° Toma los archivos scss, les pone prefijos, les borra los comentarios, crea el sourcemaps, avisa errores, los pasa a css, minifica el css y lo envia a la carpeta public
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
		.pipe(notify({ message: 'Sass task finalizada' }))
});

// 3° Vigila los posibles errores en js

gulp.task('lint', function () {
	return gulp.src('./src/js/activos/*.js')
		.pipe(jshint())
});

// 4° Toma los archivos js activos, los pasa por babel, avisa posibles errores, concatena los archivos, los minifica y los envía a la carpeta public

gulp.task('javascript', ['lint'], function () {
	//Para que los tome todos se usa ** si usara uno solo * tomaría cualquiera
	return gulp.src('./src/js/activos/**.js')
		.pipe(babel())
		.pipe(plumber({ errorHandler: onError }))
		.pipe(concat('all.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest('./public/js'))
		.pipe(notify({ message: 'JavaScript task finalizada' }))
});

// 5° Toma todas la imagenes, las optimiza y las envía a la carpeta public

gulp.task('imagemin', function () {
	return gulp.src('./src/img/*.*')
		.pipe(plumber({ errorHandler: onError }))
		.pipe(imagemin({
			progressive: true,
			interlaced: true
		}))
		.pipe(gulp.dest('./public/img'))
		.pipe(notify({ message: 'Imagemin task finalizada' }))
});

// 6°Crea un servidor interno, observa y actualiza automaticamente los cambios realizados en los archivos; styles.scss, *.pug, *.js y *.html. Además mantiene las tareas programadas actualizandolas automaticamente.
gulp.task('server', function () {

	bs.init({
		server: "./public/"
	})

	gulp.watch('./src/pug/*/*.pug', ['pug2html']).on("change", bs.reload)
	gulp.watch('./src/scss/*/*.scss', ['sass']).on("change", bs.reload)
	gulp.watch('./src/js/activos/*.js', ['javascript']).on("change", bs.reload)
	gulp.watch('./src/img/*.*', ['imagemin']).on("change", bs.reload)
})

// 7° Pone en ejecución toda la programación al comando gulp por consola

gulp.task('default', ['pug2html', 'sass', 'javascript', 'imagemin', 'server'], function () {

});
