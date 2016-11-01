module.exports = function () {
  return function(items, filter) {
    var ethnicityFiltered = [];
    if (filter.ethnicity === false || filter.ethnicity === 'all') {
      angular.forEach(items, function(item) {
        ethnicityFiltered.push(item);
      })
    } else {
      angular.forEach(items, function(item) {
        if (item.ethnicity === filter.ethnicity) {
          if (ethnicityFiltered.indexOf(item) == -1) {
            ethnicityFiltered.push(item);
          }
        }
      })
    }
    return ethnicityFiltered;
  }
}