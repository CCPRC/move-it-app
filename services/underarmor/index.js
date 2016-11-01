var http = require('http')
var pouchdb = require('pouchdb')
var response = require('palmettoflow-event').response
var responseError = require('palmettoflow-event').responseError
var _ = require('underscore')
module.exports = function (config) {
  var db = pouchdb(config.url)
  return function (ee) {

  	var grantAuthorization = {
      'Api-Key': 'w7kxr4nr3kstb78ejqbepz4hvq82qrsc',
      'response_type': 'code',
    	'prompt': 'login consent'
    }
    var authOptions = {
      hostname: 'https://www.mapmyfitness.com/v7.1/oauth2/uacf/authorize/',
      path: '/oauth2/authorize',
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
        }
  	ee.on('/underarmor/authorize', function (event) {
  		getMemberToken(event.object, function (token) {
        console.log(token)
      })
  	})
    // function getMemberToken(getToken) {
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
    // }
  }
}
