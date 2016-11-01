var newEvent = require('palmettoflow-event').newEvent
var _ = require('underscore')

module.exports = function ($http) {
  return {
    list: function () {
      var ne = newEvent('members', 'list', {}, {})
      return $http.post('/api', ne).then(function (result) {
        return _(result.data.object.rows).pluck('doc')
      })
    },
    get: function (member) {
      var ne = newEvent('members', 'get', member, {})
      return $http.post('/api', ne).then(function (result) {
        return result.data.object
      })
    },
    create: function (member) {
      var ne = newEvent('members', 'create', member, {})
      return $http.post('/api', ne).then(function (result) {
        return result.data.object
      })
    },
    update: function (member) {
      var ne = newEvent('members', 'update', member, {})
      return $http.post('/api', ne).then(function (result) {
        return result.data.object
      })
    },
    getFiles: function (member) {
      var ne = newEvent('members', 'getFiles', member, {})
      return $http.post('/api', ne).then(function (result) {
        return result.data.object
      })
    },
    remove: function (member) {
      var ne = newEvent('members', 'remove', member, {})
      return $http.post('/api', ne).then(function (result) {
        return result.data.object
      })
    }
  }
}
