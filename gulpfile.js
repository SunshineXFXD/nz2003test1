// 1 , 加载依赖包

// 加载 项目gulp 依赖包
const gulp = require('gulp');

// 加载 del删除依赖包
const del = require('del');

// 加载 css相关依赖包
const autoprefixer = require('gulp-autoprefixer');
const cssmin = require('gulp-cssmin');

// 加载 js相关依赖包
const uglify = require('gulp-uglify');
const babel = require('gulp-babel');

// 加载 HTML 相关依赖包
const htmlmin = require('gulp-htmlmin');

// 加载 sass 依赖包
const sass = require('gulp-sass');

// 加载 服务器 相关依赖包
const webserver = require('gulp-webserver');

// 2,定义打包规范

// 2-1,css打包规范
const cssHandler = function(){
    return gulp.src('./src/CSS/*.css')
           .pipe( autoprefixer() )
           .pipe( cssmin() )
           .pipe( gulp.dest( './dist/CSS' ) )
}


// 2-2,js打包规范
const jsHandler = function(){
    return gulp.src('./src/JS/*.js')
           .pipe( babel( {presets:['@babel/env']} ) )
           .pipe( uglify() )
           .pipe( gulp.dest( './dist/JS' ) )
}

// 2-3,html打包规范
const htmlHandler = function(){
    return gulp.src( './src/pages/*.html' )
           .pipe(htmlmin({
               removeAttributeQuotes : true ,       // 删除属性上的双引号
               removeComments : true ,              // 删除注释内容
               collapseBooleanAttributes : true ,   // 删除布尔属性的属性值
               collapseWhitespace : true ,          // 删除标签之前的空格
               minifyCSS : true ,                   // 压缩html文件中的css程序 
               minifyJS : true ,                    // 压缩html文件中的js程序
                                                    // 虽然可以压缩HTML中的js和css,但是压缩执行的不完美
                                                    // 实际项目中,不要有内部,js和css,都要写成外部文件形式
           }))
           .pipe( gulp.dest( './dist/pages' ) )
}

const indexhtmlHandler = function(){
    return gulp.src( './src/index.html' )
           .pipe(htmlmin({
               removeAttributeQuotes : true ,       // 删除属性上的双引号
               removeComments : true ,              // 删除注释内容
               collapseBooleanAttributes : true ,   // 删除布尔属性的属性值
               collapseWhitespace : true ,          // 删除标签之前的空格
               minifyCSS : true ,                   // 压缩html文件中的css程序 
               minifyJS : true ,                    // 压缩html文件中的js程序
                                                    // 虽然可以压缩HTML中的js和css,但是压缩执行的不完美
                                                    // 实际项目中,不要有内部,js和css,都要写成外部文件形式
           }))
           .pipe( gulp.dest( './dist' ) )
}
// 2-4, 图片等不需要压缩打包的文件
const imgHandler = function(){
    return gulp.src('./src/image/*.*')
           .pipe( gulp.dest('./dist/image') )
}
const jqpagHandler = function(){
    return gulp.src('./src/jquery-pagination')
        .pipe( gulp.dest('./dist/jquery-pagination') )
}

// 2-5, sass的编译 打包压缩 规范
// const sassHandler = function(){
//     return gulp.src( './src/sass/*.scss' )
//            .pipe( sass() )                       // 将 sass文件编译为 css文件
//            .pipe( autoprefixer() )               // 之后就执行css的打包规范
//            .pipe( cssmin() )
//            .pipe( gulp.dest( './dist/css' ) )    // 存储也是存储在css文件夹中
// }

// 2-6, 服务器打包执行规范
// gulp.src定义的是执行打包文件的路径.执行的是指定文件中打包之后的文件内容     
const webserverHandler = function(){
    return gulp.src('./dist')      // 指定的是运行文件的目录,也就是要运行的压缩的文件,所在的文件夹
           .pipe(webserver({
               host:'127.0.0.1',                // 主机域名,当前就是 127.0.0.1 或者 localhost
               port:'8080',                     // 定义监听端口
               livereload:true,                 // 执行热启动,如果程序代码,改变,自动刷新页面,不用重启服务器,不用手动刷新页面
               open:'http://127.0.0.1:8080',   // 默认打开的网页,输入 C 地址就会直接打开的页面
                                                // 默认的地址是,gulp.src()设定的文件夹位置,也就是默认是 dist 压缩文件夹所在的位置,执行的也是压缩之后的文件
           }))
}


// 3,定义监听规范

// 3-1,删除规范
const delHandler = function(){
    return del(['./dist']);
}

// 3-2,监听规范
const watchHandler = function(){
    gulp.watch( './src/css/*.css' ,  cssHandler);
    gulp.watch( './src/js/*.js' ,  jsHandler);
    gulp.watch( './src/pages/*.html' ,  htmlHandler);
    gulp.watch( './src/index.html' ,  indexhtmlHandler);
    

    gulp.watch( './src/images/*.*' ,  imgHandler);
    // gulp.watch( './src/sass/*.scss' ,  sassHandler);
}

// 3-3,定义默认执行程序
module.exports.default = gulp.series(
    delHandler,
    gulp.parallel( cssHandler , jsHandler , htmlHandler ,indexhtmlHandler, imgHandler , jqpagHandler),
    webserverHandler,
    watchHandler,
)