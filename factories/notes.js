var newEvent = require('palmettoflow-event').newEvent
var _ = require('underscore')

module.exports = function ($http) {
  return {
    list: function () {
      var ne = newEvent('notes', 'list', {}, {})
      return $http.post('/api', ne).then(function (result) {
        return _(result.data.object.rows).pluck('doc')
      })
    },
    get: function (note) {
      var ne = newEvent('notes', 'get', note, {})
      return $http.post('/api', ne).then(function (result) {
        return result.data.object
      })
    },
    create: function (note) {
      var ne = newEvent('notes', 'create', note, {})
      return $http.post('/api', ne).then(function (result) {
        return result.data.object
      })
    },
    update: function (note) {
      var ne = newEvent('notes', 'update', note, {})
      return $http.post('/api', ne).then(function (result) {
        return result.data.object
      })
    },
    remove: function (note) {
      var ne = newEvent('notes', 'remove', note, {})
      return $http.post('/api', ne).then(function (result) {
        return result.data.object
      })
    }
  }
}
