module.exports = function () {
  return function(items, filter) {
    var hospitalFiltered = [];
    if (filter.hospital === false || filter.hospital === 'all') {
      angular.forEach(items, function(item) {
        hospitalFiltered.push(item);
      })
    } else {
      angular.forEach(items, function(item) {
        if (item.hospital === filter.hospital) {
          if (hospitalFiltered.indexOf(item) == -1) {
            hospitalFiltered.push(item);
          }
        }
      })
    }
    return hospitalFiltered;
  }
}