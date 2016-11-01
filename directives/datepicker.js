var moment = require('moment')

module.exports = function () {
  return {
    restrict: 'A',
    link: function (scope, element, attrs) {
      if (attrs.timestamp) {
        var now = moment()
        var timestamp = moment(attrs.timestamp)
        // If the given day matches the current day, display the time
        if (now.format('D M YY') === timestamp.format('D M YY')) {
          element.html(timestamp.format('h:mm A'))
        // If the given year matches the current year, display month/day
        } else if (now.format('YY') === timestamp.format('YY')) {
          element.html(timestamp.format('MMM D'))
        // Otherwise, display the full given date
        } else {
          element.html(timestamp.format('M/D/YY'))
        }
      }
    }
  }
}
