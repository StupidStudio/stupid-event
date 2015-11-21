var gulp = 			require('gulp');
var livereload = 	require('gulp-livereload');
var source = 		require('vinyl-source-stream');
var buffer = 		require('vinyl-buffer');
var watchify = 		require('watchify');
var browserify = 	require('browserify');
var tape = 			require('gulp-tape');
var tapColorize = 	require('tap-colorize');
var run = 			require('tape-run');


/**
 * @define {object} paths for building
 */
var settings = {
	build: './dist',
	source: './src'
};

var liveTestSettings = {
	build: './test/live/public',
	source: './test/live'
};
/*
 * Bundler
 * --------------------------------------------------
 */
var bundler = watchify(browserify(liveTestSettings.source + '/index.js'));

/*
 * JS
 * --------------------------------------------------
 */
gulp.task('live-test', function(){
	return bundler.bundle()
	.on('error', function(err){ console.log(err.message); this.emit('end');})
	.pipe(source('bundle.js'))
	.pipe(buffer())
	.pipe(gulp.dest(liveTestSettings.build + '/js'))
	.pipe(livereload());
});

gulp.task('test', function() {
  return gulp.src('test/unit/*.js')
    .pipe(tape({
      reporter: tapColorize()
    }));
});

/*
 * Watch
 * --------------------------------------------------
 */
gulp.task('watch', function() {
	livereload.listen();
	gulp.watch('./*.js', ['live-test']); 
});

/*
 * Default
 * --------------------------------------------------
 */
gulp.task('dev', ['live-test']);
gulp.task('default', ['watch', 'dev']);