var d3 = require('d3')
var h = require('hyperscript')

module.exports = function () {
  return {
    restrict: 'A',
    template: template(),
    controller: ['$scope', controller]
  }
}

function controller ($scope) {
 // setting up size of line chart
  var margin = {top: 10, right: 10, bottom: 10, left: 10}
  var width = 600 - margin.left - margin.right
  var height = 400 - margin.top - margin.bottom

 // parse date from data
  var parseDate = d3.time.format("%d-%b-%y").parse

 // set scales
  var x =  d3.time.scale()
    .range([0, width])
  var y = d3.scale.linear()
    .range([height, 0])

 // create axes
  var xAxis = d3.svg.axis()
    .scale(x)
    .orient('bottom')
  var yAxis = d2.svg.axis()
    .scale(y)
    .orient('left')

 // fill the underbelly
    var area = d3.svg.area()
      .x(function(d) { return x(d.date); })
      .y0(height)
      .y1(function(d) { return y(d.close); });
 // construct the line using points from data
  var line = d3.svg.line()
    .x(function(d) {return x(d.date)})
    .y(function(d) {return y(d.metric)})

  var svg = d3.select('.linechart').append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
  .append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top)

//TODO set to scoped metric
  d3.json('currentData', function(data) {
    data.forEach(function(d) {
      d.date = parseDate(d.date)
      d.metric = +d.metric
    })
  })

 // establish domain for x and y axes
 //extent gets min and max values
  x.domain(d3.extent(data, function(d) { return d.date; }))
  y.domain(d3.extent(data, function(d) { return d.metric; }))

 // add groups
  svg.append('g')
    .attr('class', 'xAxis')
    .attr('transform', 'translate(0,' + height + ')')
    .call(xAxis)
  svg.append('g')
    .attr('class', 'yAxis')
    .call('yAxis')
  svg.append('path')
    .datum(data)
    .attr('class', 'line')
    .attr('d', 'line')
}

function template () {
  return h('div', [

  ])
}

// ref https://www.youtube.com/watch?v=ideI-h03ZKE