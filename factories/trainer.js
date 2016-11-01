var newEvent = require('palmettoflow-event').newEvent
var _ = require('underscore')

module.exports = function ($http) {
  return {
    list: function () {
      var ne = newEvent('trainers', 'list', {}, {})
      return $http.post('/api', ne).then(function (result) {
        return _(result.data.object.rows).pluck('doc')
      })
    },
    get: function (trainer) {
      var ne = newEvent('trainers', 'get', trainer, {})
      return $http.post('/api', ne).then(function (result) {
        return result.data.object
      })
    },
    create: function (trainer) {
      var ne = newEvent('trainers', 'create', trainer, {})
      return $http.post('/api', ne).then(function (result) {
        return result.data.object
      })
    },
    update: function (trainer) {
      var ne = newEvent('trainers', 'update', trainer, {})
      return $http.post('/api', ne).then(function (result) {
        return result.data.object
      })
    },
    remove: function (trainer) {
      var ne = newEvent('trainers', 'remove', trainer, {})
      return $http.post('/api', ne).then(function (result) {
        return result.data.object
      })
    }
  }
}
