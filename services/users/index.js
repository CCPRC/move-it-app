var pouchdb = require('pouchdb')
var response = require('palmettoflow-event').response
var responseError = require('palmettoflow-event').responseError
var _ = require('underscore')

module.exports = function (config) {
  var db = pouchdb(config.url)

  return function (ee) {
    ee.on('/users/list', function (event) {
      db.query(function (doc) {
        if (doc.type === 'user') { emit(doc._id, doc.firstName) }
      }, { include_docs: true }).then(function (results) {
        ee.emit('send', response(event, results))
      }).catch(function (err) {
        console.log(err)
        ee.emit('send', responseError(event, results))
      })
    })

    ee.on('/users/listPhysicians', function (event) {
      db.query(function (doc) {
        if (doc.type === 'user' && doc.classification === 'Physician') { emit(doc._id, doc.firstName) }
      }, { include_docs: true }).then(function (results) {
        ee.emit('send', response(event, results))
      }).catch(function (err) {
        console.log(err)
        ee.emit('send', responseError(event, results))
      })
    })

    ee.on('/users/listNavigators', function (event) {
      db.query(function (doc) {
        if (doc.type === 'user' && doc.classification === 'Navigator') { emit(doc._id, doc.firstName) }
      }, { include_docs: true }).then(function (results) {
        ee.emit('send', response(event, results))
      }).catch(function (err) {
        console.log(err)
        ee.emit('send', responseError(event, results))
      })
    })
    
    ee.on('/users/listTrainers', function (event) {
      db.query(function (doc) {
        if (doc.type === 'user' && doc.classification === 'Trainer') { emit(doc._id, doc.firstName) }
      }, { include_docs: true }).then(function (results) {
        ee.emit('send', response(event, results))
      }).catch(function (err) {
        console.log(err)
        ee.emit('send', responseError(event, results))
      })
    })

    ee.on('/users/get', function (event) {
      var user = event.object
      db.query(function (doc) {
        emit(doc._id, {firstName: doc.firstName, lastName: doc.lastName})
      }, {key: user, include_docs: true}).then(function (results) {
        ee.emit('send', response(event, _(results.rows).pluck('value')))
      }).catch(function (err) {
        console.log(err)
        ee.emit('send', responseError(event, results))
      })
    })

    ee.on('/users/getUserByAuthId', function (event) {
      var user = event.object
      db.query('move_it/getUserByAuthId', {key: user, include_docs: true}).then(function (results) {
        console.log(results)
        ee.emit('send', response(event, _(results.rows).pluck('doc')))
      }).catch(function (err) {
        console.log(err)
        ee.emit('send', responseError(event, results))
      })
    })

    ee.on('/users/create', function (event) {
      var user = event.object
      user.type = 'user'
      db.post(user).then(function (result) {
        ee.emit('send', response(event, result))
      }).catch(function (err) {
        console.log(err)
        ee.emit('send', responseError(event, result))
      })
    })

    ee.on('/users/update', function (event) {
      var user = event.object
      db.put(user).then(function (result) {
        ee.emit('send', response(event, result))
      }).catch(function (err) {
        console.log(err)
        ee.emit('send', responseError(event, result))
      })
    })

    ee.on('/users/remove', function (event) {
      var user = event.object
      db.get(user).then(function (doc) {
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
