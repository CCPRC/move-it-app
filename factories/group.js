var newEvent = require('palmettoflow-event').newEvent
var _ = require('underscore')

module.exports = function ($http) {
  return {
    list: function () {
      var ne = newEvent('groups', 'list', {}, {})
      return $http.post('/api', ne).then(function (result) {
        return _(result.data.object.rows).pluck('doc')
      })
    },
    get: function (group) {
      var ne = newEvent('groups', 'get', group, {})
      return $http.post('/api', ne).then(function (result) {
        return result.data.object
      })
    },
    create: function (group) {
      var ne = newEvent('groups', 'create', group, {})
      return $http.post('/api', ne).then(function (result) {
        return result.data.object
      })
    },
    update: function (group) {
      var ne = newEvent('groups', 'update', group, {})
      return $http.post('/api', ne).then(function (result) {
        return result.data.object
      })
    },
    remove: function (group) {
      var ne = newEvent('groups', 'remove', group, {})
      return $http.post('/api', ne).then(function (result) {
        return result.data.object
      })
    }
  }
}
