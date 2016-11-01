module.exports = function (grunt) {
require('load-grunt-tasks')(grunt)

  grunt.initConfig({
    eslint: {
        options: {
            configFile: './.eslintrc.json'
        },
        target: ['components/**/*.js', 'services/**/*.js', 'directives/*.js', 'factories/*.js']
    }
  })

  grunt.registerTask('test', 'Test code for style errors', function (target) {
    grunt.task.run([
      'eslint'
    ])
  })

  grunt.registerTask('seed-design', 'Replaces the current design document or crates a new one.', function (target) {
    if (target === 'staging') {
      return grunt.task.run([
        'env:stag',
        'env:seedDesign',
        'run'
      ])
    } else if (target === 'production') {
      return grunt.task.run([
        'env:prod',
        'env:seedDesign',
        'run'
      ])
    } else {
      return grunt.task.run([
        'env:dev',
        'env:seedDesign',
        'run'
      ])
    }
  })

  grunt.registerTask('destroy-seed-all', 'This will first delete all the data in the database', function (target) {
    if (target === 'staging') {
      return grunt.task.run([
        'env:stag',
        'env:seedAll',
        'run'
      ])
    } else if (target === 'production') {
      return grunt.task.run([
        'env:prod',
        'env:seedAll',
        'run'
      ])
    } else {
      return grunt.task.run([
        'env:dev',
        'env:seedAll',
        'run'
      ])
    }
  })
}