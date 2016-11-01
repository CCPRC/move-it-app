var newEvent = require('palmettoflow-event').newEvent
var _ = require('underscore')

module.exports = function ($http) {
  return {
    list: function () {
      var ne = newEvent('stats', 'list', {}, {})
      return $http.post('/api', ne).then(function (result) {
        return _(result.data.object.rows).pluck('doc')
      })
    },
    get: function (stat) {
      var ne = newEvent('stats', 'get', stat, {})
      return $http.post('/api', ne).then(function (result) {
        return result.data.object
      })
    },
    create: function (stat) {
      var ne = newEvent('stats', 'create', stat, {})
      return $http.post('/api', ne).then(function (result) {
        return result.data.object
      })
    },
    update: function (stat) {
      var ne = newEvent('stats', 'update', stat, {})
      return $http.post('/api', ne).then(function (result) {
        return result.data.object
      })
    },
    remove: function (stat) {
      var ne = newEvent('stats', 'remove', stat, {})
      return $http.post('/api', ne).then(function (result) {
        return result.data.object
      })
    }
  }
}
