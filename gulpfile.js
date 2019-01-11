var gulp = require("gulp");
var sass = require("gulp-sass");
var sourcemaps = require("gulp-sourcemaps");
var connect = require("gulp-connect");
var concat = require("gulp-concat");
var uglify = require("gulp-uglify");
var rename = require("gulp-rename");
var babel = require("gulp-babel");

//创建一个任务
gulp.task("hello",function(){
	console.log("hello world");
});
/*gulp.task("default",function(){
	console.log("default task");
});*/
gulp.task("copyHtml",function(){
	gulp.src("*.html")
	.pipe(gulp.dest("dist")).pipe(connect.reload());

});
gulp.task("copy-imgs",function(){
	/*gulp.src("imgs/*.{jpg,png}")
	.pipe(gulp.dest("dist/imgs"));*/
	gulp.src("imgs/*")
	.pipe(gulp.dest("dist/imgs"))
	.pipe(connect.reload());
});
gulp.task("data",function(){
	gulp.src(["json/*.json","xml/*.xml","!json/secret.json"])
	.pipe(gulp.dest("dist/data"));
});
gulp.task("watch",function(){
	//gulp.watch("index.html",["copy-index"]);
	gulp.watch(["*.html","imgs/*","stylesheet/*.scss"],["copyHtml","copy-imgs","sass"]);
	
})
gulp.task("sass",function(){
	gulp.src("stylesheet/*.scss")
	.pipe(sourcemaps.init())
	.pipe(sass({outputStyle: 'compressed'}))
	.pipe(sourcemaps.write())
	.pipe(gulp.dest("dist/css"));
});

gulp.task("server",function(){
	connect.server({
		"root":"dist",
		"livereload":true
	})
});

gulp.task("concat",function(){
	gulp.src(["js/a.js","js/b.js"])
	.pipe(concat("jquery.js"))
	.pipe(gulp.dest("dist/js"))
	.pipe(uglify())
	.pipe(rename("jquery.min.js"))
	.pipe(gulp.dest('dist/js'));
});
gulp.task("babel",function(){
	gulp.src("js/es6.js")
	.pipe(babel({"presets":["es2015"]}))
	.pipe(rename("es5.js"))
	.pipe(gulp.dest("dist/js"));
})

//gulp.task("build",["hello","copyHtml","copy-imgs","data"]);
gulp.task("default",["server","watch"]);


