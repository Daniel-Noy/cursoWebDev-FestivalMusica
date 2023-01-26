const {src, dest, watch, parallel} = require('gulp');

// CSS
const plumber = require('gulp-plumber');
const sass = require('gulp-sass')(require('sass'));
const cssnano = require('cssnano');
const postcss = require('gulp-postcss');
const sourceMaps = require('gulp-sourcemaps');

// Imagenes
const webp = require('gulp-webp');
const imgMin = require('gulp-imagemin');

// JS
const terser = require('gulp-terser-js');


function compilarSass(done) {
    src('./scss/app.scss')                       //* Identificar el archivo SCSS
        .pipe(sourceMaps.init())
        .pipe(plumber())
        .pipe(sass().on('error', sass.logError)) //* Compila el archivo
        .pipe(postcss([cssnano() ] ) )
        .pipe(sourceMaps.write('.'))
        .pipe(dest('./build/css'))               //* Almacena el archivo en el disco
    
    done()
}



function toWebp(done) {
    const opciones = {
        quality: 50
    }

    src('./src/img/**/*.{png,jpg}')
        .pipe(webp(opciones))
        .pipe(dest('./build/img'))

    done()
}

function minImagen(done) {
    const opciones = {
        optimizationLevel: 4
    }

    src('./src/img/**/*.{png,jpg}')
        .pipe(imgMin(opciones))
        .pipe(dest('./build/img'))
    
    done()
}

function javaScript(done) {
    src('./src/js/**/*.js')
        .pipe(sourceMaps.init())
        .pipe(terser())
        .pipe(sourceMaps.write('.'))
        .pipe(dest('./build/js'))

    done()
}


function watcher(done) {
    watch('./scss/**/*.scss', compilarSass);
    watch('./src/js/**/*.js', javaScript)
    done()
}

function build(done) {
    compilarSass();
    javaScript();

    done()
}

exports.compilarSass = compilarSass;
exports.javaScript = javaScript;

exports.toWebp = toWebp;
exports.minificarImagenes = minImagen;
exports.optimizarImagenes = parallel(minImagen, toWebp);

exports.watcher = watcher;

exports.build = build;