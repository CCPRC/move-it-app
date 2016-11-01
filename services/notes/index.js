var pouchdb = require('pouchdb')
var response = require('palmettoflow-event').response
var responseError = require('palmettoflow-event').responseError
var _ = require('underscore')

module.exports = function (config) {
  var db = pouchdb(config.url)

  return function (ee) {

    ee.on('/notes/get', function (event) {
      var noteParent = event.object
      db.query(function (doc) {
        if(doc.type === 'notes') { emit(doc.parent_id, {doc: doc}) }
      }, {key: noteParent, include_docs: true}).then(function (results) {
        ee.emit('send', response(event, _(results.rows).pluck('value')))
      }).catch(function (err) {
        console.log(err)
        ee.emit('send', responseError(event, results))
      })
    })

    ee.on('/notes/create', function (event) {
      var note = event.object
      note.type = 'notes'
      db.post(note).then(function (result) {
        ee.emit('send', response(event, result))
      }).catch(function (err) {
        console.log(err)
        ee.emit('send', responseError(event, result))
      })
    })

    ee.on('/notes/update', function (event) {
      var note = event.object
      db.put(note).then(function (result) {
        ee.emit('send', response(event, result))
      }).catch(function (err) {
        console.log(err)
        ee.emit('send', responseError(event, result))
      })
    })

    ee.on('/notes/remove', function (event) {
      var note = event.object
      db.get(note).then(function (doc) {
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
