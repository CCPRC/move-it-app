var newEvent = require('palmettoflow-event').newEvent
var _ = require('underscore')

module.exports = function ($http) {
  var Keen = require('keen-js')
  var client = new Keen({"projectId": "56f9712a672e6c02bc29c4d8",
        "writeKey": "3e19b4b9bd84d6d407e76d6b97e8a77be02253d8fdcea798a8c40899783ea3c3685e3d3804c11282e21e9f74dea5fb0a2e06bfc71123fca31064d2bdf2d1c3f559a6e621de15ad68b83eeeaacd67d753db0695ae539f8949b528f855be561198",
        "readKey": "f1725bf21680f4658c22da1973a52a09446e4d9e5b7569d9ab9a06d5d89877698cd4d638681198148e64bdc4897a66475dd6b3273731cdfb204bbe8b6c5cb741b5c1215418c41a62256a5bef52ce1485161c04205d930527c3439e350147e9a2"})
  return {
    saveMetrics: function (metric) {
      console.log('this is backend metric ', metric)
      metric.keen = {timestamp: new Date().toISOString()}
      client.addEvent("metric/" + metric.parent_id, metric, function(err, res) {
        // console.log(metric, 'this is metric')
        if (err) {
          console.log(err, 'this is keen error')
          return err
        } else {
          console.log(res, 'this is keen res')
          return res
        }
      })
    },
    getMetrics: function (metricId) {
      Keen.ready(function () {
        var queueMetrics = new Keen.Query("metric/" + metricId, {
          event_collection: "metric/" + metricId,
          timeframe: "this_30_days",
          group_by: "keen.timestamp"
        })
        client.run(queueMetrics, function(err, res){
          if (err) {
            console.log(err)
            return err
          } else {
            console.log(res)
            return res
          }
        })
      })
    }
  }
}