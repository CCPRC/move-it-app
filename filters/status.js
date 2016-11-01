module.exports = function () {
  return function(items, filter) {
    var statusFiltered = [];
    if (filter.status === false || filter.status === 'all') {
      angular.forEach(items, function(item) {
        statusFiltered.push(item);
      })
    } else {
      angular.forEach(items, function(item) {
        if (item.status === filter.status) {
          if (statusFiltered.indexOf(item) == -1) {
            statusFiltered.push(item);
          }
        }
      })
    }
    return statusFiltered;
  }
}