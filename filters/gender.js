module.exports = function () {
  return function(items, filter) {
    var genderFiltered = [];
    if (filter.gender === false || filter.gender === 'all') {
      angular.forEach(items, function(item) {
        genderFiltered.push(item);
      })
    } else {
      angular.forEach(items, function(item) {
        if (item.gender === filter.gender) {
          if (genderFiltered.indexOf(item) == -1) {
            genderFiltered.push(item);
          }
        }
      })
    }
    return genderFiltered;
  }
}