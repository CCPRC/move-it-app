module.exports = function () {
  return function(items, filter) {
    var physicianFiltered = [];
    if (filter.physician === false || filter.physician === 'all') {
      angular.forEach(items, function(item) {
        physicianFiltered.push(item);
      })
    } else {
      angular.forEach(items, function(item) {
        if (item.physician === filter.physician) {
          if (physicianFiltered.indexOf(item) == -1) {
            physicianFiltered.push(item);
          }
        }
      })
    }
    return physicianFiltered;
  }
}