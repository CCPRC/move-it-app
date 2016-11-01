var newEvent = require('palmettoflow-event').newEvent
var _ = require('underscore')

module.exports = function ($http) {
  return {
    list: function () {
      var ne = newEvent('users', 'list', {}, {})
      return $http.post('/api', ne).then(function (result) {
        return _(result.data.object.rows).pluck('doc')
      })
    },
    listTrainers: function () {
      var ne = newEvent('users', 'listTrainers', {}, {})
      return $http.post('/api', ne).then(function (result) {
        return _(result.data.object.rows).pluck('doc')
      })
    },
    listPhysicians: function () {
      var ne = newEvent('users', 'listPhysicians', {}, {})
      return $http.post('/api', ne).then(function (result) {
        return _(result.data.object.rows).pluck('doc')
      })
    },
    listNavigators: function () {
      var ne = newEvent('users', 'listNavigators', {}, {})
      return $http.post('/api', ne).then(function (result) {
        return _(result.data.object.rows).pluck('doc')
      })
    },
    get: function (user) {
      var ne = newEvent('users', 'get', user, {})
      return $http.post('/api', ne).then(function (result) {
        return result.data.object
      })
    },
    getUserByAuthId: function (user) {
      var ne = newEvent('users', 'getUserByAuthId', user, {})
      return $http.post('/api', ne).then(function (result) {
        return result.data.object
      })
    },
    create: function (user) {
      var ne = newEvent('users', 'create', user, {})
      return $http.post('/api', ne).then(function (result) {
        return result.data.object
      })
    },
    update: function (user) {
      var ne = newEvent('users', 'update', user, {})
      return $http.post('/api', ne).then(function (result) {
        return result.data.object
      })
    },
    remove: function (user) {
      var ne = newEvent('users', 'remove', user, {})
      return $http.post('/api', ne).then(function (result) {
        return result.data.object
      })
    }
  }
}
