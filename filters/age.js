module.exports = function () {
  return function(items, filter) {
    var ageFiltered = [];
    if (filter.allAge === true) {
      angular.forEach(items, function(item) {
        ageFiltered.push(item);
      })
    } else {
      angular.forEach(items, function(item) {
        if (item.age <= filter.ageEnd && item.age >= filter.ageStart) {
          if (ageFiltered.indexOf(item) == -1) {
            ageFiltered.push(item);
          }
        }
      })
    }
    return ageFiltered;
  }
}