var newEvent = require('palmettoflow-event').newEvent
var _ = require('underscore')

module.exports = function ($http) {
  return {
    list: function () {
      var ne = newEvent('reports', 'list', {}, {})
      return $http.post('/api', ne).then(function (result) {
        return _(result.data.object.rows).pluck('doc')
      })
    },
    get: function (report) {
      var ne = newEvent('reports', 'get', report, {})
      return $http.post('/api', ne).then(function (result) {
        return result.data.object
      })
    },
    create: function (report) {
      var ne = newEvent('reports', 'create', report, {})
      return $http.post('/api', ne).then(function (result) {
        return result.data.object
      })
    },
    update: function (report) {
      var ne = newEvent('reports', 'update', report, {})
      return $http.post('/api', ne).then(function (result) {
        return result.data.object
      })
    },
    remove: function (report) {
      var ne = newEvent('reports', 'remove', report, {})
      return $http.post('/api', ne).then(function (result) {
        return result.data.object
      })
    }
  }
}
