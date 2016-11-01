var pouchdb = require('pouchdb')
var response = require('palmettoflow-event').response
var responseError = require('palmettoflow-event').responseError
var _ = require('underscore')

module.exports = function (config) {
  var db = pouchdb(config.url)

  return function (ee) {
    ee.on('/trainers/list', function (event) {
      db.query(function (doc) {
        if (doc.type === 'trainer') { emit(doc._id, doc.firstName) }
      }, { include_docs: true }).then(function (results) {
        ee.emit('send', response(event, results))
      }).catch(function (err) {
        console.log(err)
        ee.emit('send', responseError(event, results))
      })
    })

    ee.on('/trainers/get', function (event) {
      var trainer = event.object
      db.query(function (doc) {
        emit(doc._id, {firstName: doc.firstName, lastName: doc.lastName})
      }, {key: trainer, include_docs: true}).then(function (results) {
        ee.emit('send', response(event, _(results.rows).pluck('value')))
      }).catch(function (err) {
        console.log(err)
        ee.emit('send', responseError(event, results))
      })
    })

    ee.on('/trainers/create', function (event) {
      var trainer = event.object
      trainer.type = 'trainer'
      db.post(trainer).then(function (result) {
        ee.emit('send', response(event, result))
      }).catch(function (err) {
        console.log(err)
        ee.emit('send', responseError(event, result))
      })
    })

    ee.on('/trainers/update', function (event) {
      var trainer = event.object
      db.put(trainer).then(function (result) {
        ee.emit('send', response(event, result))
      }).catch(function (err) {
        console.log(err)
        ee.emit('send', responseError(event, result))
      })
    })

    ee.on('/trainers/remove', function (event) {
      var trainer = event.object
      db.get(trainer).then(function (doc) {
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
