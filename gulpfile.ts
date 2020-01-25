import * as del from 'del';
import * as gulp from 'gulp';

async function cleanBuild() {
	return await del(['dist/**/*', 'dist/**/.*']);
}

function copyAssets() {
	return gulp.src(['src/**/*', '!src/**/*.ts']).pipe(gulp.dest('dist/'));
}

exports['clean-build'] = cleanBuild;
exports['copy-assets'] = copyAssets;
