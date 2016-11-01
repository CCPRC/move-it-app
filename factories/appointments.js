var newEvent = require('palmettoflow-event').newEvent
var _ = require('underscore')

module.exports = function ($http) {
  return {
    list: function () {
      var ne = newEvent('appointments', 'list', {}, {})
      return $http.post('/api', ne).then(function (result) {
        return _(result.data.object.rows).pluck('doc')
      })
    },
    get: function (appointment) {
      var ne = newEvent('appointments', 'get', appointment, {})
      return $http.post('/api', ne).then(function (result) {
        return result.data.object
      })
    },
    create: function (appointment) {
      var ne = newEvent('appointments', 'create', appointment, {})
      return $http.post('/api', ne).then(function (result) {
        return result.data.object
      })
    },
    update: function (appointment) {
      var ne = newEvent('appointments', 'update', appointment, {})
      return $http.post('/api', ne).then(function (result) {
        return result.data.object
      })
    },
    remove: function (appointment) {
      var ne = newEvent('appointments', 'remove', appointment, {})
      return $http.post('/api', ne).then(function (result) {
        return result.data.object
      })
    }
  }
}
