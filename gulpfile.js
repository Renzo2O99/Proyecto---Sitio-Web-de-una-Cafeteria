const { src, dest, watch, series, parallel } = require('gulp');

// CSS y SASS
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const cssnano = require('cssnano');

// Función que nos permite compilar el archivo SASS.
function css(done) {
  // Compilamos SASS

  // 1. Identificamos el archivo (hoja de SASS).
  // 2. Compilamos el archivo.
  // 3. Guardamos el archivo ".css".

  // Le indicamos el archivo para que pueda identificarlo:
    src('src/scss/app.scss')
        // Inicializamos la creación del sourcemap para nuestra hooja de Sass
        .pipe( sourcemaps.init() )

        // Compilamos el archivo.
        .pipe(sass())
        .pipe(postcss([
          autoprefixer(), cssnano()
        ]))

        // El sourcemap se guardará en el mismo lugar que la hoja de Sass gracias al "."
        .pipe( sourcemaps.write('.'))

        // Y por último, lo almacenamos en el proyecto.
        .pipe(dest("build/css"));

    done();
}

// Función que nos permite compilar en tiempo real el archivo SASS.
function dev() {
  // La función watch() toma como argumentos dos argumentos:
  // El primero se trata del archivo a inspeccionar y,
  // en caso de cambios en el mismo,
  // ejecuta la función que toma como segundo argumento.

  // Sintaxis para múltiples archivos con la extensión ".scss":
    watch('src/scss/**/*.scss', css);
}

exports.css = css;
exports.dev = dev;

// Con series podemos inicializar múltiples tareas, pero primero debe
// llegar a su final la primera para poder continuar con la segunda tarea.

// Con Parallel podemos realizar múltiples tareas en paralelo, lo que quiere decir
// que todas las tareas se ejecutarán al mismo tiempo e irán finalizando en su respectivo orden.

// Tareas por default:
exports.default = series(css, dev);