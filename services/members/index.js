var pouchdb = require('pouchdb')
var response = require('palmettoflow-event').response
var responseError = require('palmettoflow-event').responseError
var _ = require('underscore')

module.exports = function (config) {
  var db = pouchdb(config.url)

  return function (ee) {
    ee.on('/members/list', function (event) {
      db.query(function (doc) {
        if (doc.type === 'member') { emit(doc._id, doc.firstName) }
      }, { include_docs: true }).then(function (results) {
        ee.emit('send', response(event, results))
      }).catch(function (err) {
        console.log(err)
        ee.emit('send', responseError(event, results))
      })
    })

    ee.on('/members/get', function (event) {
      var member = event.object
      db.query(function (doc) {
        emit(doc._id, {firstName: doc.firstName, lastName: doc.lastName})
      }, {key: member, include_docs: true}).then(function (results) {
        ee.emit('send', response(event, _(results.rows).pluck('value')))
      }).catch(function (err) {
        console.log(err)
        ee.emit('send', responseError(event, results))
      })
    })

    ee.on('/members/create', function (event) {
      var member = event.object
      member.type = 'member'
      member.files = []
      db.post(member).then(function (result) {
        ee.emit('send', response(event, result))
      }).catch(function (err) {
        console.log(err)
        ee.emit('send', responseError(event, result))
      })
    })

    ee.on('/members/update', function (event) {
      var member = event.object
      db.put(member).then(function (result) {
        ee.emit('send', response(event, result))
      }).catch(function (err) {
        console.log(err)
        ee.emit('send', responseError(event, result))
      })
    })

    ee.on('/members/saveImage', function (event) {
      var member = event.object
      var imageRoute = event.actor
      db.get(member).then(function (res) {
        res.avatar = imageRoute
        db.put(res).then(function (result) {
          ee.emit('send', response(event, result))
        }).catch(function (err) {
          console.log(err)
          ee.emit('send', responseError(event, result))
        })
      }).catch(function (err) {
          console.log(err)
          ee.emit('send', responseError(event, result))
      })
    })

    ee.on('/members/saveFile', function (event) {
      var member = event.object
      var fileRoute = event.actor
      db.get(member).then(function (res) {
        res.files.push(fileRoute)
        db.put(res).then(function (result) {
          ee.emit('send', response(event, result))
        }).catch(function (err) {
          console.log(err)
          ee.emit('send', responseError(event, result))
        })
      }).catch(function (err) {
          console.log(err)
          ee.emit('send', responseError(event, result))
      })
    })

    ee.on('/members/getFiles', function (event) {
      var memberId = event.object
      db.query(function (doc) {
        if (doc._id === memberId) { emit(doc._id, doc.files) }
      }, {key: memberId, include_docs: true}).then(function (results) {
        ee.emit('send', response(event, _(results.rows).pluck('value')))
      }).catch(function (err) {
        console.log(err)
        ee.emit('send', responseError(event, results))
      })
    })

    ee.on('/members/remove', function (event) {
      // console.log(event)
      var member = event.object
      db.get(member).then(function (doc) {
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
