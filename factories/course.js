var newEvent = require('palmettoflow-event').newEvent
var _ = require('underscore')

module.exports = function ($http) {
  return {
    list: function () {
      var ne = newEvent('courses', 'list', {}, {})
      return $http.post('/api', ne).then(function (result) {
        return _(result.data.object.rows).pluck('doc')
      })
    },
    get: function (course) {
      var ne = newEvent('courses', 'get', course, {})
      return $http.post('/api', ne).then(function (result) {
        return result.data.object
      })
    },
    create: function (course) {
      var ne = newEvent('courses', 'create', course, {})
      return $http.post('/api', ne).then(function (result) {
        console.log("result", result);
         grabNewCourse(result);
        return result.data.object
        console.log("course result", result.data.object);

      })
    },
    update: function (course) {
      var ne = newEvent('courses', 'update', course, {})
      return $http.post('/api', ne).then(function (result) {
        return result.data.object
      })
    },
    remove: function (course) {
      var ne = newEvent('courses', 'remove', course, {})
      return $http.post('/api', ne).then(function (result) {
        return result.data.object
      })
    }
  }
}
