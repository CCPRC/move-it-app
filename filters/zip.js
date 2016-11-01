module.exports = function () {
  return function(items, filter) {
    var zipCodeFiltered = [];
    if (filter.zipcode === '') {
      angular.forEach(items, function(item) {
        zipCodeFiltered.push(item);
      })
    } else {
      angular.forEach(items, function(item) {
        if (item.zipcode === filter.zipcode) {
          if (zipCodeFiltered.indexOf(item) == -1) {
            zipCodeFiltered.push(item);
          }
        }
      })
    }
    return zipCodeFiltered;
  }
}