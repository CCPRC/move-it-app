var pouchdb = require('pouchdb')
var response = require('palmettoflow-event').response
var responseError = require('palmettoflow-event').responseError
var _ = require('underscore')

module.exports = function (config) {
  var db = pouchdb(config.url)

  return function (ee) {
    ee.on('/reports/list', function (event) {
      db.query(function (doc) {
        if (doc.type === 'report') { emit(doc._id, doc.reportName) }
      }, { include_docs: true }).then(function (results) {
        ee.emit('send', response(event, results))
      }).catch(function (err) {
        console.log(err)
        ee.emit('send', responseError(event, results))
      })
    })

    ee.on('/reports/get', function (event) {
      var report = event.object
      db.query(function (doc) {
        emit(doc._id, {reportName: doc.reportName})
      }, {key: report, include_docs: true}).then(function (results) {
        ee.emit('send', response(event, _(results.rows).pluck('value')))
      }).catch(function (err) {
        console.log(err)
        ee.emit('send', responseError(event, results))
      })
    })

    ee.on('/reports/create', function (event) {
      var report = event.object
      report.type = 'report'
      db.post(report).then(function (result) {
        ee.emit('send', response(event, result))
      }).catch(function (err) {
        console.log(err)
        ee.emit('send', responseError(event, result))
      })
    })

    ee.on('/reports/update', function (event) {
      var report = event.object
      db.put(report).then(function (result) {
        ee.emit('send', response(event, result))
      }).catch(function (err) {
        console.log(err)
        ee.emit('send', responseError(event, result))
      })
    })

    ee.on('/reports/remove', function (event) {
      var report = event.object
      db.get(report).then(function (doc) {
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
