const {
    src,
    dest,
    task,
    series,
    watch,
    parallel
} = require('gulp')

const rm = require('gulp-rm');
const sass = require('gulp-sass'); // компиляция sass в css
sass.compiler = require('node-sass'); // компиляция sass в css
const concat = require('gulp-concat'); // склейка файлов
const browserSync = require('browser-sync').create(); // Локальный сервер
const reload = browserSync.reload
const sassGlob = require('gulp-sass-glob'); // продвинутое подключение стилей через *
const autoprefixer = require('gulp-autoprefixer'); // Автопрефиксы
const px2rem = require('gulp-smile-px2rem'); // Пересчет единиц измерения 
const gcmq = require('gulp-group-css-media-queries'); // Группировка медиа-запросов
const cleanCSS = require('gulp-clean-css'); // Минификация css файлов
const sourcemaps = require('gulp-sourcemaps'); // sourcemaps
const babel = require('gulp-babel'); // Трансляция ES6
const uglify = require('gulp-uglify'); // Минификация JavaScript
const svgo = require('gulp-svgo'); // Генерация SVG-спрайта
const svgSprite = require('gulp-svg-sprite'); // Генерация SVG-спрайта
const gulpif = require('gulp-if'); // стадии проекта Dev vs Prod
const env = process.env.NODE_ENV;

task('clean', () => { // таск для очистки папки dist
    return src('dist/**/*', {
            read: false
        })
        .pipe(rm())
});

task('copy:html', () => { // копирование html в папку dist
    return src('src/*.html').pipe(dest('dist')).pipe(reload({
        stream: true
    }))
});
const stylelibs = [
    'node_modules/normalize.css/normalize.css',
    'src/styles/main.scss'
];
task('styles', () => { // таск для стилей 
    return src(stylelibs)
        .pipe(gulpif(env === 'dev', sourcemaps.init())) // sourcemaps
        .pipe(concat('main.min.scss')) // склейка файлов
        .pipe(sassGlob()) // продвинутое подключение стилей через *
        .pipe(sass().on('error', sass.logError)) // компиляция scss в css
        // .pipe(px2rem()) // Пересчет единиц измерения НЕ ВКЛЮЧАТЬ 
        .pipe(gulpif(env === 'prod', autoprefixer({ // Автопрефиксы
            cascade: false
        })))
        .pipe(gulpif(env === 'prod', gcmq())) // Группировка медиа-запросов 
        .pipe(gulpif(env === 'prod', cleanCSS())) // Минификация css файлов
        .pipe(gulpif(env === 'dev', sourcemaps.write())) // sourcemaps
        .pipe(dest('dist')) // сохранение готовых файлов в папку dist
        .pipe(reload({
            stream: true
        }));
});
const libs = [
    'src/scripts/*.js'
];
task('scripts', () => { // таск для JavaScript 
    return src(libs)
        .pipe(gulpif(env === 'dev', sourcemaps.init()))
        .pipe(concat('main.min.js', {
            newLine: ';'
        })) // склейка файлов
        .pipe(babel({ // Трансляция ES6
            presets: ['@babel/env']
        }))
        .pipe(gulpif(env === 'prod', uglify())) // Минификация JavaScript
        .pipe(gulpif(env === 'dev', sourcemaps.write()))
        .pipe(dest('dist'))
        .pipe(reload({
            stream: true
        }));
});

task('img', () => { // таск для подключения картинок 
    return src('src/img/**')
        .pipe(dest('dist/img'));
});

task('video', () => { // таск для подключения картинок 
    return src('src/video/**')
        .pipe(dest('dist/video'));
});

task('fonts', () => { // таск для подключения шрифтов
    return src('src/fonts/**', {})
        .pipe(dest('dist/fonts'));
});

task('icons', () => {
    return src('src/icons-svg/*.svg')
        .pipe(svgo({ // спрайт svg
            plugins: [{
                removeAttrs: {
                    attrs: '(fill|stroke|style|width|height|data.*)'
                }
            }]
        }))
        .pipe(dest('dist/icons-svg'));
});

task('icons', () => {
    return src('src/icons-svg/*.svg')
        .pipe(svgSprite({ // спрайт svg
            mode: {
                symbol: {
                    sprite: '../sprite.svg'
                }
            }
        }))
        .pipe(dest('dist/icons-svg'));
});

task('server', () => { // таск для локального сервера
    browserSync.init({
        server: {
            baseDir: './dist'
        },
        open: false
    });
});

task('watch', () => {
    watch('./src/styles/**/*.scss', series('styles')); // слежка за файлами scss
    watch('./src/*.html', series('copy:html')); // слежка за файлами html
    watch('./src/scripts/*.js', series('scripts')); // слежка за файлами JavaScript
    watch('./src/icons-svg/*.svg', series('icons')); // слежка за файлами svg иконок
    watch('./src/img/**', series('img')); // слежка за папкой img
    watch('./src/fonts/**', series('fonts')); // слежка за папкой img
    watch('./src/video/**', series('video')); // слежка за папкой video
});

task('default',
    series('clean',
        parallel('copy:html', 'styles', 'scripts', 'img', 'fonts', 'icons', 'video',),
        parallel('watch', 'server')
    )
); // дефолтный такс для запуска Gulp

task('build',
    series('clean', parallel('copy:html', 'styles', 'scripts', 'img', 'fonts', 'icons'))); // дефолтный такс для запуска Gulp