var gulp          = require('gulp'),
		sass          = require('gulp-sass'),
		browserSync   = require('browser-sync'),
		notify        = require("gulp-notify");
		

gulp.task('browser-sync', function() {
	browserSync({
		server: {
			baseDir: 'app'
		},
		//notify: false
	})
});

gulp.task('styles', function() {
	return gulp.src('app/sass/**/*.sass')
	.pipe(sass({ outputStyle: 'expand' }).on("error", notify.onError()))
	.pipe(gulp.dest('app/css'))
	.pipe(browserSync.stream())
});

gulp.task('watch', ['browser-sync'], function() {
	gulp.watch('app/sass/**/*.sass', ['styles']);
	gulp.watch('app/js/**/*.js', browserSync.reload);
	gulp.watch('app/*.html', browserSync.reload)
});

gulp.task('default', ['watch']);
