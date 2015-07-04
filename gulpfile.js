var
	// load dependency
	dateformat = require("dateformat"),
	gulp = require("gulp"),
	$ = require("gulp-load-plugins")(),
	merge = require("merge-stream"),
	runSequence = require("run-sequence"),

	// package info
	pkg = require("./package.json"),

	// list all pages
	pages = [
		"index",
		"kdintroplain",
		"kdintrotimeline"
	];

if (process.env.BUILDTIME) {
	pkg.version += "-" + process.env.BUILDTIME;
}
if (process.env.GITHASH) {
	pkg.version += "-" + process.env.GITHASH;
}

// project config
var paths = {
		"tmpl": ["src/**/*.html"]
	},
	banner = [
		"/* " + pkg.name + " v" + pkg.version + " " + dateformat(new Date(), "yyyy-mm-dd"),
		" * " + pkg.homepage,
		" * License: " + pkg.license,
		" */\n\n"
	].join("\n"),
	useminOpt = function() {
		return {
			css: [
				$.minifyCss(),
				$.insert.prepend(banner)
			],
			js: [
				$.insert.wrap("(function(){", "})();"),
				$.uglify(),
				$.insert.prepend(banner)
			],
			html: [
				$.replace("lib/jquery/dist/jquery.js", "lib/jquery/dist/jquery.min.js"),
				$.replace("lib/angular/angular.js", "lib/angular/angular.min.js"),
				$.replace("lib/TimelineJS/build/js/timeline.js", "lib/TimelineJS/build/js/timeline-min.js"),
				$.minifyInline(),
				$.minifyHtml({ empty: true })
			],
			enableHtmlComment: true
		};
	};

gulp.task("default", ["build"]);

gulp.task("dev", ["watch"]);

gulp.task("up", ["update-npm", "update-bower"]);

gulp.task("build", function(done) {
	runSequence(
		// stage 1: build resource
		["tmpl", "bower.json", "jshint", "static"],

		// stage 2: build pages
		["page"],

		done);
});

gulp.task("tmpl", function() {
	return gulp.src(paths.tmpl)
		.pipe($.angularTemplatecache("angular-template.tmp.js", {
			templateHeader: 'app.run(["$templateCache", function($templateCache) {',
			root: "src"
		}))
		.pipe(gulp.dest("src"))
		.pipe($.size({"title": "angular-template.tmp.js"}));
});

gulp.task("page", function() {
	var tasks = pages.map(function(page) {
		return gulp.src(page + ".src.html")
			.pipe($.rename({ basename: page }))
			.pipe($.usemin(useminOpt()))
			.pipe(gulp.dest("./"))
			.pipe($.size({"title": page + " page", "showFiles": true}));
	});
	return merge(tasks);
});

gulp.task("jshint", function() {
	return gulp.src(["!**/*.tmp.js", "!src/config/appInject.js", "!src/config/ga.js", "*.js", "src/**/*.js"])
		.pipe($.jshint({
			laxcomma: true
		}))
		.pipe($.jshint.reporter("default"))
		.pipe($.jshint.reporter("fail"))
		.pipe($.jscs());
});

gulp.task("bower.json", function() {
	return gulp.src(["bower.json"])
		.pipe($.replace(/"name": "[^"]*"/, "\"name\": \"" + pkg.name + "\""))
		.pipe(gulp.dest("./"));
});

gulp.task("static", function() {
	var taskImage = gulp.src(["src/static/**/*.png"])
		.pipe($.imagemin())
		.pipe(gulp.dest("public/static"));
	var taskOther = gulp.src(["!src/static/**/*.png", "src/static/**"])
		.pipe(gulp.dest("public/static"));
	return merge([taskImage, taskOther]);
});

gulp.task("update-npm", function(done) {
	var cmd = "sh -c './node_modules/npm-check-updates/bin/npm-check-updates -u'";
	$.run(cmd).exec().on("end", done);
});

gulp.task("update-bower", function(done) {
	var bowerjson = require("./bower.json");
	var deps = [];
	var i, cmd;

	for (i in bowerjson.dependencies) {
		deps.push(i);
	}
	cmd = "bower install --save --force-latest " + deps.join(" ");
	$.run(cmd).exec().on("end", done);
});

gulp.task("watch", function() {
	var watchs = ["src/**"];
	pages.map(function(page) {
		watchs.push(page + ".src.html");
	});
	gulp.watch(watchs, function(info) {
		gulp.src(info.path)
			.pipe($.connect.reload());
	});
	$.connect.server({
		root: "./",
		port: 9000,
		livereload: true,
		middleware: function(connect, opt) {
			return [
				function(req, res, next) {
					$.util.log(req.method, req.url);
					next();
				}
			];
		}
	});
});

gulp.task("test", function(done) {
	gulp.src(paths.test)
		.pipe(karma({
			configFile: "karma.config.js",
			action: "run"
		}))
		.on("error", function(err) {
			console.log(err);
			this.emit("end");
		})
		.on("end", done);
});
