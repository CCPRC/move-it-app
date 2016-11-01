var newEvent = require('palmettoflow-event').newEvent
var _ = require('underscore')

module.exports = function ($http) {
  return {
    list: function () {
      var ne = newEvent('physicians', 'list', {}, {})
      return $http.post('/api', ne).then(function (result) {
        return _(result.data.object.rows).pluck('doc')
      })
    },
    get: function (physician) {
      var ne = newEvent('physicians', 'get', physician, {})
      return $http.post('/api', ne).then(function (result) {
        return result.data.object
      })
    },
    create: function (physician) {
      var ne = newEvent('physicians', 'create', physician, {})
      return $http.post('/api', ne).then(function (result) {
        return result.data.object
      })
    },
    update: function (physician) {
      var ne = newEvent('physicians', 'update', physician, {})
      return $http.post('/api', ne).then(function (result) {
        return result.data.object
      })
    },
    remove: function (physician) {
      var ne = newEvent('physicians', 'remove', physician, {})
      return $http.post('/api', ne).then(function (result) {
        return result.data.object
      })
    }
  }
}
