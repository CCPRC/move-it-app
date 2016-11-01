var pouchdb = require('pouchdb')
var response = require('palmettoflow-event').response
var responseError = require('palmettoflow-event').responseError
var _ = require('underscore')

module.exports = function (config) {
  var db = pouchdb(config.url)

  return function (ee) {
    ee.on('/attendance/list', function (event) {
      db.query(function (doc) {
        if (doc.type === 'attendance') { emit(doc._id, doc.attendanceName) }
      }, { include_docs: true }).then(function (results) {
        ee.emit('send', response(event, results))
      }).catch(function (err) {
        console.log(err)
        ee.emit('send', responseError(event, results))
      })
    })

    ee.on('/attendance/get', function (event) {
      var attendance = event.object
      db.query(function (doc) {
        emit(doc._id, {doc: doc})
      }, {key: attendance, include_docs: true}).then(function (results) {
        ee.emit('send', response(event, _(results.rows).pluck('value')))
      }).catch(function (err) {
        console.log(err)
        ee.emit('send', responseError(event, results))
      })
    })

    ee.on('/attendance/getAttendanceByClass', function (event) {
      var parent = event.object
      db.query(function (doc) {
        emit(doc.parent_id)
      }, { key: parent, include_docs: true }).then(function (results) {
        ee.emit('send', response(event, _(results.rows).pluck('doc')))
      }).catch(function (err) {
        ee.emit('send', responseError(event, err))
      })
    })

    ee.on('/attendance/create', function (event) {
      var attendance = event.object
      attendance.type = 'attendance'
      db.post(attendance).then(function (result) {
        ee.emit('send', response(event, result))
      }).catch(function (err) {
        console.log(err)
        ee.emit('send', responseError(event, result))
      })
    })

    ee.on('/attendance/addAttendee', function (event) {
      db.get(event.object).then(function (attendanceObject) {
        attendanceObject.attendees.push(event.actor)
        db.put(attendanceObject).then(function (result) {
        }).catch(function (err) {
          ee.emit('send', responseError(event, result))
        })
      }).catch(function (err) {
        ee.emit('send', responseError(event, attendanceObject))
      })
    })

    ee.on('/attendance/removeAttendee', function (event) {
      db.get(event.object).then(function (attendanceObject) {
        for (var i = 0; i < attendanceObject.attendees.length; i++) {
          var thisAttendee = attendanceObject.attendees[i]
          if (thisAttendee.id === event.actor.id) {
            attendanceObject.attendees.splice(i, 1)
          }
        }
        db.put(attendanceObject).then(function (result) {
        }).catch(function (err) {
          ee.emit('send', responseError(event, result))
        })
      }).catch(function (err) {
        ee.emit('send', responseError(event, attendanceObject))
      })
    })

    ee.on('/attendance/update', function (event) {
      var attendance = event.object
      db.put(attendance).then(function (result) {
        ee.emit('send', response(event, result))
      }).catch(function (err) {
        console.log(err)
        ee.emit('send', responseError(event, result))
      })
    })

    ee.on('/attendance/remove', function (event) {
      var attendance = event.object
      db.get(attendance).then(function (doc) {
        return db.remove(doc)
      }).then(function (result) {
        ee.emit('send', response(event, result))
      }).catch(function (err) {
        console.log(err)
        ee.emit('send', responseError(event, result))
      })
    })
  }
}
