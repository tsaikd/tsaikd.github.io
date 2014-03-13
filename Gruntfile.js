module.exports = function(grunt) {

	grunt.initConfig({
		pkg: grunt.file.readJSON("bower.json"),
		meta: {
			bowerrc: grunt.file.readJSON(".bowerrc"),
			lib: "<%= meta.bowerrc.directory %>",
			dist: "."
		},
		clean: {
			dist: [
				".tmp",
				"<%= meta.dist %>/index/*.min.*",
				"<%= meta.dist %>/index/*.tmp.*",
				"<%= meta.dist %>/index.html",
				"<%= meta.dist %>/kdintro/*.min.*",
				"<%= meta.dist %>/kdintro/*.tmp.*",
				"<%= meta.dist %>/kdintro.html"
			]
		},
		copy: {
			index: {
				src: "<%= meta.dist %>/index.src.html",
				dest: "<%= meta.dist %>/index.html"
			},
			kdintro: {
				src: "<%= meta.dist %>/kdintro.src.html",
				dest: "<%= meta.dist %>/kdintro.html"
			}
		},
		useminPrepare: {
			index: {
				src: "<%= meta.dist %>/index.html"
			},
			kdintro: {
				src: "<%= meta.dist %>/kdintro.html"
			},
			options: {
				dest: "<%= meta.dist %>"
			}
		},
		usemin: {
			html: [
				"<%= meta.dist %>/index.html",
				"<%= meta.dist %>/kdintro.html"
			]
		},
		version: {
			dist: {
				src: ["<%= meta.dist %>/index/index.min.js"]
			}
		},
		ngtemplates: {
			"index": {
				src: ["<%= meta.dist %>/index/*.html"],
				dest: "<%= meta.dist %>/index/index.ngtpl.tmp.js",
				options: {
					usemin: "<%= meta.dist %>/index/index.min.js",
					bootstrap: function(module, script) {
						return "app.run(['$templateCache', function($templateCache) {" + script + "}]);";
					}
				}
			},
			"kdintro": {
				src: ["<%= meta.dist %>/kdintro/*.html"],
				dest: "<%= meta.dist %>/kdintro/kdintro.ngtpl.tmp.js",
				options: {
					usemin: "<%= meta.dist %>/kdintro/kdintro.min.js",
					bootstrap: function(module, script) {
						return "app.run(['$templateCache', function($templateCache) {" + script + "}]);";
					}
				}
			}
		},
		connect: {
			server: {
				options: {
					port: 9000,
					debug : true,
					livereload : true
				}
			}
		},
		watch: {
			livereload: {
				options: {
					livereload: true
				},
				files: [
					"*.json",
					"**/*.html",
					"**/*.js",
					"**/*.css"
				]
			}
		}
	});

	require("load-grunt-tasks")(grunt);
	grunt.registerTask("build", ["copy", "ngtemplates", "useminPrepare", "concat", "cssmin", "uglify", "usemin", "version"]);
	grunt.registerTask("default", ["clean", "sync", "build"]);
	grunt.registerTask("dev", ["connect", "watch"]);

};
