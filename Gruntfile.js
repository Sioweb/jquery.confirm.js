module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		uglify: {
			options: {
				banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
			},
			build: {
				files: [{
					expand: true,
					cwd: 'src',
					src: ['**/*.js','!*.min.js'],
					dest: 'dist',
      		rename: function (dst, src) {
      			return dst +'/'+ src.replace('.js','.min.js');
      		}
				}]
			}
		},
		cssmin: {
			build: {
				files: [{
					expand: true,
					cwd: 'src',
					src: ['*.css','!*.min.css'],
					dest: 'dist',
      		rename: function (dst, src) {
      			return dst +'/'+ src.replace('.css','.min.css');
      		}
				}]
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.registerTask('default', ['uglify','cssmin']);

};