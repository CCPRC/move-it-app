var newEvent = require('palmettoflow-event').newEvent
var _ = require('underscore')

module.exports = function ($http) {
  return {
    list: function () {
      var ne = newEvent('attendance', 'list', {}, {})
      return $http.post('/api', ne).then(function (result) {
        return _(result.data.object.rows).pluck('doc')
      })
    },
    get: function (id) {
      var ne = newEvent('attendance', 'get', id, {})
      return $http.post('/api', ne).then(function (result) {
        return result.data.object
      })
    },
    getAttendanceByClass: function (parent_id) {
      var ne = newEvent('attendance', 'getAttendanceByClass', parent_id, {})
      return $http.post('/api', ne).then(function (result) {
        return result.data.object
      })
    },
    create: function (attendance) {
      var ne = newEvent('attendance', 'create', attendance, {})
      return $http.post('/api', ne).then(function (result) {
        console.log("attendance result", result);
        return result.data.object
      })
    },
    addAttendee: function (class_id, attendeeObject) {
      var ne = newEvent('attendance', 'addAttendee', class_id, attendeeObject)
      return $http.post('/api', ne).then(function (result) {
        return result.data.object
      })
    },
    removeAttendee: function (class_id, attendeeObject) {
      var ne = newEvent('attendance', 'removeAttendee', class_id, attendeeObject)
      return $http.post('/api', ne).then(function (result) {
        return result.data.object
      })
    },
    update: function (attendance) {
      var ne = newEvent('attendance', 'update', attendance, {})
      return $http.post('/api', ne).then(function (result) {
        return result.data.object
      })
    },
    remove: function (id) {
      var ne = newEvent('attendance', 'remove', id, {})
      return $http.post('/api', ne).then(function (result) {
        return result.data.object
      })
    }
  }
}
