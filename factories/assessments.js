var newEvent = require('palmettoflow-event').newEvent
var _ = require('underscore')

module.exports = function ($http) {
  return {
    list: function () {
      var ne = newEvent('assessments', 'list', {}, {})
      return $http.post('/api', ne).then(function (result) {
        return _(result.data.object.rows).pluck('doc')
      })
    },
    get: function (assessment) {
      var ne = newEvent('assessments', 'get', assessment, {})
      return $http.post('/api', ne).then(function (result) {
        return result.data.object
      })
    },
    create: function (assessment) {
      var ne = newEvent('assessments', 'create', assessment, {})
      return $http.post('/api', ne).then(function (result) {
        return result.data.object
      })
    },
    update: function (assessment) {
      var ne = newEvent('assessments', 'update', assessment, {})
      return $http.post('/api', ne).then(function (result) {
        return result.data.object
      })
    },
    remove: function (assessment) {
      var ne = newEvent('assessments', 'remove', assessment, {})
      return $http.post('/api', ne).then(function (result) {
        return result.data.object
      })
    }
  }
}
