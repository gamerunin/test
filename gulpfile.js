import gulp from 'gulp';
import babel from 'gulp-babel';
import postcss from 'gulp-postcss';
import terser from 'gulp-terser';
import rename from 'gulp-rename';
import sass from 'gulp-sass';
import plumber from 'gulp-plumber';
import rigger from 'gulp-rigger';
import imagemin from 'gulp-imagemin';
import del from 'del';
import panini from "panini";
import sync from 'browser-sync';
import csso from 'postcss-csso';
import pimport from 'postcss-import';
import autoprefixer from 'autoprefixer';

// Path config
const path = {
    build: {
        html: "dist/",
        json: "dist/",
        js: "dist/assets/js/",
        css: "dist/assets/css/",
        images: "dist/assets/img/",
        fonts: "dist/assets/fonts/",
    },
    src: {
        html: "src/*.html",
        json: "src/*.json",
        js: "src/assets/js/index.js",
        css: "src/assets/scss/index.scss",
        images: "src/assets/img/**/*.{jpg,jpeg,png,svg,gif,ico,webmanifest,xml}",
        fonts: "src/assets/fonts/**/*",
    },
    watch: {
        html: "src/**/*.html",
        json: "src/*.json",
        js: "src/assets/js/**/*.js",
        css: "src/assets/scss/**/*.scss",
        images: "src/assets/img/**/*.{jpg,jpeg,png,svg,gif,ico,webmanifest,xml}",
        fonts: "src/assets/fonts/**/*",
    },
    clean: "./dist"
}

// HTML
export const html = () => {
    panini.refresh();
    return gulp.src(path.src.html, { base: "src/" })
        .pipe(plumber())
        .pipe(panini({
            root: 'src/',
            layouts: 'src/layouts/',
            partials: 'src/partials/',
            helpers: 'src/helpers/',
            data: 'src/data/'
        }))
        .pipe(gulp.dest(path.build.html))
        .pipe(sync.stream());
};

// JSON Data
export const json = () => {
    return gulp.src(path.src.json, { base: "src/" })
        .pipe(plumber())
        .pipe(gulp.dest(path.build.json))
        .pipe(sync.stream());
};

// Styles
export const css = () => {
    return gulp.src(path.src.css, { base: "src/assets/scss" })
        .pipe(plumber())
        .pipe(sass())
        .pipe(postcss([
            pimport,
            autoprefixer,
        ]))
        .pipe(gulp.dest(path.build.css))
        .pipe(postcss([csso]))
        .pipe(rename({
            suffix: ".min",
            extname: ".css"
        }))
        .pipe(gulp.dest(path.build.css))
        .pipe(sync.stream());
};

// Scripts
export const js = () => {
    return gulp.src(path.src.js, { base: "src/assets/js" })
        .pipe(plumber())
        .pipe(rigger())
        .pipe(babel({
            presets: ['@babel/preset-env']
        }))
        .pipe(gulp.dest(path.build.js))
        .pipe(terser()) // compress
        .pipe(rename({
            suffix: ".min",
            extname: ".js"
        }))
        .pipe(gulp.dest(path.build.js))
        .pipe(sync.stream());
};

// Images
export const images = () => {
    return gulp.src(path.src.images)
        .pipe(imagemin())
        .pipe(gulp.dest(path.build.images))
        .pipe(sync.stream({
            once: true
        }));
}

// Fonts
export const fonts = () => {
    return gulp.src(path.src.fonts, {base: 'src/assets/fonts'})
        .pipe(gulp.dest(path.build.fonts))
        .pipe(sync.stream({
            once: true
        }));
};

// Clean
export const clean = () => {
    return del(path.clean);
}

// Server
export const server = () => {
    sync.init({
        ui: false,
        notify: false,
        server: {
            baseDir: 'dist'
        },
        port: 3000
    });
};

function serverReload() {
    sync.reload();
}

// Watch
export const watch = () => {
    gulp.watch(path.watch.html, gulp.series(html));
    gulp.watch(path.watch.json, gulp.series(json));
    gulp.watch(path.watch.css, gulp.series(css));
    gulp.watch(path.watch.js, gulp.series(js));
    gulp.watch(path.watch.images, gulp.series(images));
    gulp.watch(path.watch.fonts, gulp.series(fonts));
};

// Default
export default gulp.series(
    clean, //clean dist
    gulp.parallel(
        html,
        json,
        css,
        js,
        images,
        fonts,
    ),
    gulp.parallel(
        watch,
        server,
    ),
);
