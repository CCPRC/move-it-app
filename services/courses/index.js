var pouchdb = require('pouchdb')
var response = require('palmettoflow-event').response
var responseError = require('palmettoflow-event').responseError
var _ = require('underscore')

module.exports = function (config) {
  var db = pouchdb(config.url)

  return function (ee) {
    ee.on('/courses/list', function (event) {
      db.query(function (doc) {
        if (doc.type === 'course') { emit(doc._id, doc.courseName) }
      }, { include_docs: true }).then(function (results) {
        ee.emit('send', response(event, results))
      }).catch(function (err) {
        console.log(err)
        ee.emit('send', responseError(event, results))
      })
    })

    ee.on('/courses/get', function (event) {
      var course = event.object
      db.query(function (doc) {
        emit(doc._id, {doc: doc})
      }, {key: course, include_docs: true}).then(function (results) {
        ee.emit('send', response(event, _(results.rows).pluck('value')))
      }).catch(function (err) {
        console.log(err)
        ee.emit('send', responseError(event, results))
      })
    })

    ee.on('/courses/create', function (event) {
      var course = event.object
      course.type = 'course'
      db.post(course).then(function (result) {
        ee.emit('send', response(event, result))
      }).catch(function (err) {
        console.log(err)
        ee.emit('send', responseError(event, result))
      })
    })

    ee.on('/courses/update', function (event) {
      var course = event.object
      db.put(course).then(function (result) {
        ee.emit('send', response(event, result))
      }).catch(function (err) {
        console.log(err)
        ee.emit('send', responseError(event, result))
      })
    })

    ee.on('/courses/remove', function (event) {
      var course = event.object
      db.get(course).then(function (doc) {
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
