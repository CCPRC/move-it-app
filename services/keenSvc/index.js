var pouchdb = require('pouchdb')
var response = require('palmettoflow-event').response
var responseError = require('palmettoflow-event').responseError
var _ = require('underscore')
var Keen = require('keen-js')

module.exports = function (config) {
  // var keenKey = config.get('keen')
  return function (ee) {
  var client = new Keen({"projectId": "56f9712a672e6c02bc29c4d8",
  	"writeKey": "3e19b4b9bd84d6d407e76d6b97e8a77be02253d8fdcea798a8c40899783ea3c3685e3d3804c11282e21e9f74dea5fb0a2e06bfc71123fca31064d2bdf2d1c3f559a6e621de15ad68b83eeeaacd67d753db0695ae539f8949b528f855be561198",
  	"readKey": "f1725bf21680f4658c22da1973a52a09446e4d9e5b7569d9ab9a06d5d89877698cd4d638681198148e64bdc4897a66475dd6b3273731cdfb204bbe8b6c5cb741b5c1215418c41a62256a5bef52ce1485161c04205d930527c3439e350147e9a2"})
  	ee.on('keen/saveMetrics', function (event) {
  		console.log('got event', event)
  		var metric = event.object
  		metric.keen = {timestamp: new Date().toISOString()}
  		client.addEvent("metric", metric, function(err, res) {
  			console.log(metric, 'this is metric')
			  if (err) {
			    console.log(err, 'this is keen error')
			    ee.emit('send', responseError(event, err))
			  }
			  else {
			    console.log(res, 'this is keen res')
			    ee.emit('send', response(event, res))
			  }
			})
  	})
  }
}