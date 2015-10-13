var options = {

		'assetsPath' : '/',
		'viewsPath' : '/'

	},
	gulp = require('gulp'),
	sass = require('gulp-sass'),
	sourcemaps = require('gulp-sourcemaps'),
	gutil = require('gulp-util');

var sassTask = function() {

	gutil.log(gutil.colors.yellow('Writing CSS to '+options.assetsPath+'css and generating a CSS map...'));

	gulp.src(options.assetsPath+'sass/*.scss')
		.pipe(sourcemaps.init())
		.pipe(sass({
		
			includePaths : [options.assetsPath+'css/'],

		}).on('end', function() {

			gutil.log(gutil.colors.green('SASS successfully written! Amazing!'));

		})
		.on('error', function(err) {
			
			var filePath = err.file.split('/');

			gutil.log(gutil.colors.red(err.file))
			gutil.log(gutil.colors.red('Line: ' + err.line, 'Col: ' + err.column + ' - ' + err.message))
			gutil.log(gutil.colors.red('SASS not compiled...!'))

		}))
		.pipe(sourcemaps.write('maps'))
		.pipe(gulp.dest(options.assetsPath+'css/'))
		.on('error', gutil.log);
}


var watchTask = function() {

	gulp.watch(options.assetsPath+'sass/**/*.scss', ['sass']);

}

gulp.task('sass', sassTask);
gulp.task('watch', watchTask);

gulp.task('default', ['sass', 'watch']);