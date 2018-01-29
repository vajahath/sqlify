import * as del from 'del';
import * as gulp from 'gulp';

// copy assets files from src to dist
gulp.task('copy-assets', () => {
	return gulp.src(['src/**/*', '!src/**/*.ts']).pipe(gulp.dest('dist/'));
});

gulp.task('clean-build', () => {
	return del.sync(['dist/**/*', 'dist/**/.*']);
});
