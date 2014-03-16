module.exports = function(grunt) {

	grunt.initConfig({
		pkg: grunt.file.readJSON("package.json"),
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
				"<%= meta.dist %>/kdintroplain/*.min.*",
				"<%= meta.dist %>/kdintroplain/*.tmp.*",
				"<%= meta.dist %>/kdintroplain.html",
				"<%= meta.dist %>/kdintrotimeline/*.min.*",
				"<%= meta.dist %>/kdintrotimeline/*.tmp.*",
				"<%= meta.dist %>/kdintrotimeline.html"
			]
		},
		sync: {
			options: {
				include: ["name", "version", "description", "authors", "license", "homepage", "main"]
			}
		},
		copy: {
			index: {
				src: "<%= meta.dist %>/index.src.html",
				dest: "<%= meta.dist %>/index.html"
			},
			kdintroplain: {
				src: "<%= meta.dist %>/kdintroplain.src.html",
				dest: "<%= meta.dist %>/kdintroplain.html"
			},
			kdintrotimeline: {
				src: "<%= meta.dist %>/kdintrotimeline.src.html",
				dest: "<%= meta.dist %>/kdintrotimeline.html"
			}
		},
		useminPrepare: {
			options: {
				dest: "<%= meta.dist %>"
			},
			index: {
				src: "<%= meta.dist %>/index.html"
			},
			kdintroplain: {
				src: "<%= meta.dist %>/kdintroplain.html"
			},
			kdintrotimeline: {
				src: "<%= meta.dist %>/kdintrotimeline.html"
			}
		},
		usemin: {
			html: [
				"<%= meta.dist %>/index.html",
				"<%= meta.dist %>/kdintroplain.html",
				"<%= meta.dist %>/kdintrotimeline.html"
			]
		},
		version: {
			dist: {
				src: ["<%= meta.dist %>/index/index.min.js"]
			}
		},
		ngtemplates: {
			options: {
				usemin: "<%= meta.dist %>/index/index.min.js",
				bootstrap: function(module, script) {
					return "app.run(['$templateCache', function($templateCache) {" + script + "}]);";
				}
			},
			"index": {
				src: ["<%= meta.dist %>/index/*.html"],
				dest: "<%= meta.dist %>/index/angular-template.tmp.js"
			},
			"kdintroplain": {
				src: ["<%= meta.dist %>/kdintroplain/*.html"],
				dest: "<%= meta.dist %>/kdintroplain/angular-template.tmp.js"
			},
			"kdintrotimeline": {
				src: ["<%= meta.dist %>/kdintrotimeline/*.html"],
				dest: "<%= meta.dist %>/kdintrotimeline/angular-template.tmp.js"
			}
		},
		sitemap: {
			dist: {
				siteRoot: "./"
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
	grunt.registerTask("dev", ["build", "connect", "watch"]);

};
