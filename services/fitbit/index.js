var http = require('http')
var pouchdb = require('pouchdb')
var response = require('palmettoflow-event').response
var responseError = require('palmettoflow-event').responseError
var _ = require('underscore')
var fitbitId = '227MDT'
var fitbitSecret = '131ebcfd5e7f4738423e27c344c40886'
var fitbitAuthorizeUrl = 'https://www.fitbit.com/oauth2/authorize'
var fitbitTokenUrl = 'https://api.fitbit.com/oauth2/token'
// URL for Fitbit api = https://api.fitbit.com/1/user/-/activities/steps/date/2016-04-02/7d.json
// replace the - after user with the encoded user id after validation process
// the date is the start perriod, the 7d after is the time frame of the requested data
module.exports = function (config) {
  var db = pouchdb(config.url)
  return function (ee) {
    // Authorization post data: this will allow access to a users fitbit account for 1 year without renewing tokens
        var authPostData = {
          'client_id': fitbitId,
          'expires_in': '31536000',
          'scope': 'activity',
          'response_type': 'token',
          'prompt': 'login consent'
        }
        var authOptions = {
          hostname: 'https://www.fitbit.com',
          path: '/oauth2/authorize',
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
    // ee.on('/fitbit/authorize', function (event) {
    //   console.log('got event', event)
    //   var req = http.request(authOptions, (res) => {
    //     console.log(`STATUS: ${res.statusCode}`)
    //     console.log(`HEADERS: ${JSON.stringify(res.headers)}`)
    //     res.setEncoding('utf8')
    //     res.on('data', (chunk) => {
    //       console.log(`BODY: ${chunk}`)
    //     })
    //     res.on('end', () => {
    //       console.log('No more data in response.')
    //     })
    //   })
    //   req.on('error', (e) => {
    //     console.log(`problem with request: ${e.message}`)
    //   })
    //   // write data to request body
    //   req.write(authPostData)
    //   req.end()
    //   // db.query(function (doc) {
    //   //   if (doc.type === 'fitbit') { emit(doc._id, doc.member_id) }
    //   // }, { include_docs: true }).then(function (results) {
    //   //   ee.emit('send', response(event, results))
    //   // }).catch(function (err) {
    //   //   console.log(err)
    //   //   ee.emit('send', responseError(event, results))
    //   // })
    // })
    ee.on('/fitbit/get', function (event) {
        var fitbitId = event.object
        db.query(function (doc) {
        emit(doc._id, {doc: doc})
      }, {key: fitbitId, include_docs: true}).then(function (results) {
        ee.emit('send', response(event, _(results.rows).pluck('value')))
      }).catch(function (err) {
        console.log(err)
        ee.emit('send', responseError(event, results))
      })
    })
  }
}
