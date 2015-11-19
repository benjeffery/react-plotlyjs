var gulp = require('gulp');
var bump = require('gulp-bump');
var git = require("gulp-git");


/**
 * Version bump tasks
 */

function getBumpTask(type) {
	return function () {
		return gulp.src(['./package.json', './bower.json'])
			.pipe(bump({ type: type }))
			.pipe(gulp.dest('./'));
	};
}

gulp.task('bump', getBumpTask('patch'));
gulp.task('bump:minor', getBumpTask('minor'));
gulp.task('bump:major', getBumpTask('major'));


/**
 * Git tag task
 * (version *must* be bumped first)
 */

gulp.task('publish:tag', function (done) {
	var pkg = require('./package.json');
	var v = 'v' + pkg.version;
	var message = 'Release ' + v;

	git.tag(v, message, function (err) {
		if (err) throw err;
		git.push('origin', v, function (err) {
			if (err) throw err;
			done();
		});
	});
});


/**
 * npm publish task
 * * (version *must* be bumped first)
 */

gulp.task('publish:npm', function (done) {
	require('child_process')
		.spawn('npm', ['publish'], { stdio: 'inherit' })
		.on('close', done);
});


/**
 * Deploy tasks
 */

gulp.task('release', ['publish:tag', 'publish:npm']);
