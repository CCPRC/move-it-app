var pouchdb = require('pouchdb')
var response = require('palmettoflow-event').response
var responseError = require('palmettoflow-event').responseError
var _ = require('underscore')

module.exports = function (config) {
  var db = pouchdb(config.url)

  return function (ee) {
    ee.on('/assessments/list', function (event) {
    	db.query(function (doc) {
    		if(doc.type === 'assessments') { emit(doc._id) }
    	}, { include_docs: true }).then(function (results) {
    		ee.emit('send', response(event, results))
    	}).catch(function (err) {
    		console.log(err)
    		ee.emit('send', responseError(event, results))
    	})
    })

    ee.on('/assessments/get', function (event) {
      var assessmentParent = event.object
      db.query(function (doc) {
        if(doc.type === 'assessments') { emit(doc.parent_id, {doc: doc}) }
      }, {key: assessmentParent, include_docs: true}).then(function (results) {
        ee.emit('send', response(event, _(results.rows).pluck('value')))
      }).catch(function (err) {
        console.log(err)
        ee.emit('send', responseError(event, results))
      })
    })

    ee.on('/assessments/create', function (event) {
      var assessment = event.object
      assessment.type = 'assessments'
      db.post(assessment).then(function (result) {
        ee.emit('send', response(event, result))
      }).catch(function (err) {
        console.log(err)
        ee.emit('send', responseError(event, result))
      })
    })

    ee.on('/assessments/update', function (event) {
      var assessment = event.object
      db.put(assessment).then(function (result) {
        ee.emit('send', response(event, result))
      }).catch(function (err) {
        console.log(err)
        ee.emit('send', responseError(event, result))
      })
    })

    ee.on('/assessments/remove', function (event) {
      var assessment = event.object
      db.get(assessment).then(function (doc) {
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
